import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message, phone = '', subject = '' } = body || {};

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'name, email and message are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return new Response(JSON.stringify({ message: 'Telegram bot not configured on server' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sanitize = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const telegramMessage =
      `🆕 New Contact\n\n` +
      `Name: ${sanitize(name)}\n` +
      `Email: ${sanitize(email)}\n` +
      (phone ? `Phone: ${sanitize(phone)}\n` : '') +
      (subject ? `Subject: ${sanitize(subject)}\n` : '') +
      `\nMessage:\n${sanitize(message)}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload = { chat_id: chatId, text: telegramMessage };

    const telegramRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!telegramRes.ok) {
      const details = await telegramRes.json().catch(() => null);
      return new Response(JSON.stringify({ message: 'Failed to send to Telegram', details }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Message sent to Telegram' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}