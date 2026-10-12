using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Domain.Entities;

/// <summary>
/// Доменна сутність кошика покупок користувача.
/// Зберігає інформацію про обрані товари до моменту завершення оформлення замовлення.
/// </summary>
public class Cart
{
    /// <summary>
    /// Унікальний ідентифікатор кошика покупок.
    /// </summary>
    public string Id { get; set; } = string.Empty;

    /// <summary>
    /// Ідентифікатор зареєстрованого користувача або гостьової сесії, якій належить кошик.
    /// </summary>
    public string UserId { get; set; } = string.Empty;

    /// <summary>
    /// Колекція обраних позицій (товарів та обраних параметрів), доданих до кошика.
    /// </summary>
    public List<CartItem> Items { get; set; } = new();

    /// <summary>
    /// Дата та час останнього оновлення вмісту кошика (UTC).
    /// </summary>
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}