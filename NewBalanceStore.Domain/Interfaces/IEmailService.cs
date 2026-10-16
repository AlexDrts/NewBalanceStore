using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace NewBalanceStore.Domain.Interfaces;

public interface IEmailService
{
    Task SendVerificationEmailAsync(string email, string code);
}