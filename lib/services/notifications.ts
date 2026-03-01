import { NotificationChannel } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

export async function sendNotification(params: {
  userId: string;
  channel: NotificationChannel;
  recipient: string;
  subject: string;
  payload: Record<string, unknown>;
}) {
  const shouldSendSms = process.env.ENABLE_REAL_SMS === "true";
  const shouldSendEmail = process.env.ENABLE_REAL_EMAIL === "true";
  const enabled = params.channel === "SMS" ? shouldSendSms : shouldSendEmail;

  if (!enabled) {
    console.log("[notification:stub]", params);
  }

  await prisma.notificationLog.create({
    data: {
      userId: params.userId,
      channel: params.channel,
      recipient: params.recipient,
      subject: params.subject,
      payload: params.payload,
      status: enabled ? "queued" : "stubbed"
    }
  });
}
