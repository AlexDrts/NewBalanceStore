using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Domain.Entities;

/// <summary>
/// Представляє окрему позицію в оформленому замовленні,
/// фіксуючи знімок ціни товару та обрані параметри на момент покупки.
/// </summary>
public class OrderItem
{
    /// <summary>
    /// Ідентифікатор придбаного товару.
    /// </summary>
    public string ProductId { get; set; } = string.Empty;

    /// <summary>
    /// Назва товару на момент створення замовлення.
    /// </summary>
    public string ProductName { get; set; } = string.Empty;

    /// <summary>
    /// Обраний колір виробу.
    /// </summary>
    public string Color { get; set; } = string.Empty;

    /// <summary>
    /// Обраний розмір виробу.
    /// </summary>
    public string Size { get; set; } = string.Empty;

    /// <summary>
    /// Кількість замовлених одиниць.
    /// </summary>
    public int Quantity { get; set; }

    /// <summary>
    /// Зафіксована ціна за одиницю товару на момент оформлення замовлення.
    /// Забезпечує незмінність вартості у звітах навіть при зміні поточної ціни в каталозі.
    /// </summary>
    public decimal Price { get; set; }
}