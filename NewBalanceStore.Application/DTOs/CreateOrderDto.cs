using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Application.DTOs
{
    /// <summary>
    /// DTO для передачі даних при створенні нового клієнтського замовлення під час Checkout.
    /// </summary>
    public class CreateOrderDto
    {
        /// <summary>
        /// Повне ім'я та прізвище покупця.
        /// </summary>
        public string CustomerName { get; set; } = string.Empty;

        /// <summary>
        /// Електронна пошта замовника для надсилання підтвердження.
        /// </summary>
        public string CustomerEmail { get; set; } = string.Empty;

        /// <summary>
        /// Номер мобільного телефону отримувача.
        /// </summary>
        public string CustomerPhone { get; set; } = string.Empty;

        /// <summary>
        /// Повна поштова адреса для кур'єрської або поштової доставки.
        /// </summary>
        public string ShippingAddress { get; set; } = string.Empty;

        /// <summary>
        /// Список товарних позицій, що оформлюються в замовленні.
        /// </summary>
        public List<CreateOrderItemDto> Items { get; set; } = new();
    }

    /// <summary>
    /// DTO замовленої одиниці товару під час оформлення покупки.
    /// </summary>
    public class CreateOrderItemDto
    {
        /// <summary>
        /// Ідентифікатор замовленого товару.
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// Обраний колір моделі.
        /// </summary>
        public string Color { get; set; } = string.Empty;

        /// <summary>
        /// Обраний розмір моделі.
        /// </summary>
        public string Size { get; set; } = string.Empty;

        /// <summary>
        /// Кількість замовлених одиниць.
        /// </summary>
        public int Quantity { get; set; }
    }
}