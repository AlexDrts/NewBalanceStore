using System;
using System.Collections.Generic;
using System.Text;
using NewBalanceStore.Domain.Enums;

namespace NewBalanceStore.Domain.Entities
{
    /// <summary>
    /// Доменна сутність замовлення в системі інтернет-магазину.
    /// Фіксує інформацію про покупця, адресу доставки, обрані товари та фінансовий підсумок.
    /// </summary>
    public class Order
    {
        /// <summary>
        /// Унікальний ідентифікатор замовлення.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Повне ім'я та прізвище покупця, вказані при оформленні.
        /// </summary>
        public string CustomerName { get; set; } = string.Empty;

        /// <summary>
        /// Контактна адреса електронної пошти замовника для сповіщень.
        /// </summary>
        public string CustomerEmail { get; set; } = string.Empty;

        /// <summary>
        /// Контактний номер телефону замовника для зв'язку служби доставки.
        /// </summary>
        public string CustomerPhone { get; set; } = string.Empty;

        /// <summary>
        /// Повна фізична адреса доставки (країна, місто, вулиця, поштовий індекс).
        /// </summary>
        public string ShippingAddress { get; set; } = string.Empty;

        /// <summary>
        /// Загальна сума вартості всіх замовлених позицій у замовленні.
        /// </summary>
        public decimal TotalAmount { get; set; }

        /// <summary>
        /// Поточний статус життєвого циклу замовлення (наприклад, "Pending", "Processing", "Shipped", "Delivered", "Cancelled").
        /// </summary>
        public string Status { get; set; } = "Pending";

        /// <summary>
        /// Дата та час створення замовлення у форматі UTC.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Список замовлених позицій товарів, що входять до складу замовлення.
        /// </summary>
        public List<OrderItem> Items { get; set; } = new();
    }
}