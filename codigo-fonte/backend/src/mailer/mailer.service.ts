import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: Transporter;

  constructor(private cfg: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.cfg.get<string>('SMTP_HOST'),
      port: Number(this.cfg.get<string>('SMTP_PORT')),
      secure: this.cfg.get<string>('SMTP_SECURE') === 'true',
      auth: this.cfg.get<string>('SMTP_USER')
        ? {
            user: this.cfg.get<string>('SMTP_USER'),
            pass: this.cfg.get<string>('SMTP_PASS'),
          }
        : undefined,
    });
  }

  private shell(htmlContent: string, title: string) {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    /* Mobile-first */
    body{margin:0;background:#f6f9fc;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial}
    .wrapper{max-width:560px;margin:0 auto;padding:24px}
    .card{background:#fff;border-radius:16px;box-shadow:0 2px 10px rgba(20,20,20,.06);overflow:hidden}
    .header{background:linear-gradient(135deg,#6366f1,#22d3ee);padding:24px;color:#fff}
    .brand{font-size:18px;font-weight:700;letter-spacing:.3px}
    .content{padding:24px;color:#0f172a}
    .btn{display:inline-block;padding:12px 16px;border-radius:12px;text-decoration:none;background:#0ea5e9;color:#fff;font-weight:600}
    .muted{color:#64748b;font-size:12px;margin-top:16px}
    .footer{padding:16px 24px;color:#94a3b8;font-size:12px}
    @media (prefers-color-scheme: dark){
      body{background:#0b1220}
      .card{background:#0f172a}
      .header{background:linear-gradient(135deg,#4f46e5,#0891b2)}
      .content{color:#e2e8f0}
      .footer{color:#94a3b8}
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div class="brand">Companion</div>
        <div style="opacity:.9;margin-top:6px">${title}</div>
      </div>
      <div class="content">${htmlContent}</div>
      <div class="footer">© ${new Date().getFullYear()} Companion. Todos os direitos reservados.</div>
    </div>
  </div>
</body>
</html>`;
  }

  async sendPasswordReset(to: string, url: string) {
    const from = this.cfg.get<string>('MAIL_FROM');
    const html = this.shell(
      `
<p>Recebemos uma solicitação para redefinir sua senha.</p>
<p>Para continuar, clique no botão abaixo. Este link expira em breve.</p>
<p style="margin:20px 0"><a class="btn" href="${url}">Criar nova senha</a></p>
<p class="muted">Se você não solicitou esta ação, ignore este e-mail.</p>
`,
      'Recuperação de senha',
    );

    await this.transporter.sendMail({
      from,
      to,
      subject: 'Redefinição de senha',
      html,
    });
  }

  async sendInvite(to: string, url: string) {
    const from = this.cfg.get<string>('MAIL_FROM');
    const html = this.shell(
      `
<p>Você foi convidado para acessar o Companion.</p>
<p>Para criar sua conta, clique no botão abaixo. O convite expira em breve.</p>
<p style="margin:20px 0"><a class="btn" href="${url}">Aceitar convite</a></p>
<p class="muted">Se você não reconhece este convite, ignore este e-mail.</p>
`,
      'Convite de acesso',
    );
    await this.transporter.sendMail({
      from,
      to,
      subject: 'Convite para acesso',
      html,
    });
  }
}
