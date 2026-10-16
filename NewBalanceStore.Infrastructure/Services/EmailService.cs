using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using NewBalanceStore.Domain.Interfaces;

namespace NewBalanceStore.Infrastructure.Services;

public class EmailService(IConfiguration configuration) : IEmailService
{
    public async Task SendVerificationEmailAsync(string email, string code)
    {
        var smtpHost = configuration["EmailSettings:Host"] ?? "localhost";
        var smtpPort = int.Parse(configuration["EmailSettings:Port"] ?? "1025");
        var sendEmail = configuration["EmailSettings:SendEmail"] ?? "no-reply@newbalance.com";

        var templatePath = Path.Combine(AppContext.BaseDirectory, "Templates", "email-verification.html");

        string htmlBody;
        if (File.Exists(templatePath))
        {
            var htmlTemplate = await File.ReadAllTextAsync(templatePath);
            htmlBody = htmlTemplate.Replace("{{VerificationCode}}", code);
        }
        else
        {
            htmlBody = $"<h1>New Balance Store</h1><p>Ваш код подтверждения: <b>{code}</b></p>";
        }

        try
        {
            using var client = new SmtpClient(smtpHost, smtpPort);
            using var mailMessage = new MailMessage
            {
                From = new MailAddress(sendEmail, "New Balance Store"),
                Subject = "Подтверждение регистрации",
                Body = htmlBody,
                IsBodyHtml = true
            };

            mailMessage.To.Add(email);
            await client.SendMailAsync(mailMessage);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"\n----------------------------------------");
            Console.WriteLine($"[DEV EMAIL MOCK] Не удалось отправить SMTP-письмо: {ex.Message}");
            Console.WriteLine($"[DEV EMAIL MOCK] Код верификации для {email}: >>> {code} <<<");
            Console.WriteLine($"----------------------------------------\n");
        }
    }
}