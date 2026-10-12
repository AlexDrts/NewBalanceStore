using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Infrastructure.Configurations;

/// <summary>
/// Клас конфігураційних параметрів для підключення до сервісу Cloudinary.
/// Зчитується із секції <c>CloudinarySettings</c> файлу <c>appsettings.json</c>.
/// </summary>
public class CloudinarySettings
{
    /// <summary>
    /// Назва хмари в обліковому записі Cloudinary (Cloud Name).
    /// </summary>
    public string CloudName { get; set; } = string.Empty;

    /// <summary>
    /// Публічний ключ доступу до API Cloudinary (API Key).
    /// </summary>
    public string ApiKey { get; set; } = string.Empty;

    /// <summary>
    /// Секретний ключ доступу до API Cloudinary (API Secret).
    /// </summary>
    public string ApiSecret { get; set; } = string.Empty;
}