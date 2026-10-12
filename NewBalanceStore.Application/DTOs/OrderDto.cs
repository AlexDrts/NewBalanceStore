using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Application.DTOs
{
    /// <summary>
    /// DTO оформленого замовлення, що повертається клієнту або адмін-панелі.
    /// </summary>
    public class OrderDto
    {
        /// <summary>
        /// Унікальний ідентифікатор замовлення.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Повне ім'я покупця.
        /// </summary>
        public string CustomerName { get; set; } = string.Empty;

        /// <summary>
        /// Електронна пошта покупця.
        /// </summary>
        public string CustomerEmail { get; set; } = string.Empty;

        /// <summary>
        /// Номер телефону покупця.
        /// </summary>
        public string CustomerPhone { get; set; } = string.Empty;

        /// <summary>
        /// Адреса доставки замовлення.
        /// </summary>
        public string ShippingAddress { get; set; } = string.Empty;

        /// <summary>
        /// Загальна сума замовлення.
        /// </summary>
        public decimal TotalAmount { get; set; }

        /// <summary>
        /// Поточний статус замовлення ("Pending", "Processing", "Shipped", "Delivered", "Cancelled").
        /// </summary>
        public string Status { get; set; } = string.Empty;

        /// <summary>
        /// Дата та час оформлення замовлення (UTC).
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Список замовлених товарних позицій.
        /// </summary>
        public List<OrderItemDto> Items { get; set; } = new();
    }

    /// <summary>
    /// DTO товарної позиції всередині замовлення.
    /// </summary>
    public class OrderItemDto
    {
        /// <summary>
        /// Числовий ідентифікатор товару.
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// Назва товару на момент покупки.
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
        /// Зафіксована ціна одиниці товару на момент замовлення.
        /// </summary>
        public decimal Price { get; set; }
    }
}