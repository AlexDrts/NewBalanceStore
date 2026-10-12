using System;

namespace NewBalanceStore.Domain.Enums;

/// <summary>
/// Статуси життєвого циклу клієнтського замовлення в системі.
/// </summary>
public enum OrderStatus
{
    /// <summary>
    /// Замовлення щойно створено та очікує на підтвердження менеджером або оплату.
    /// </summary>
    Pending,

    /// <summary>
    /// Замовлення прийнято в обробку та комплектується на складі.
    /// </summary>
    Processing,

    /// <summary>
    /// Замовлення запаковано та передано поштовій службі / перевізнику.
    /// </summary>
    Shipped,

    /// <summary>
    /// Замовлення успішно доставлено та отримано покупцем.
    /// </summary>
    Delivered,

    /// <summary>
    /// Замовлення скасовано покупцем або адміністратором.
    /// </summary>
    Cancelled
}