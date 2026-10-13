using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Domain.Entities;

/// <summary>
/// Значеннєвий об'єкт (Value Object), що інкапсулює поштову адресу фізичної доставки замовлення.
/// </summary>
public class ShippingAddress
{
    /// <summary>
    /// Країна доставки (наприклад, "Україна", "USA").
    /// </summary>
    public string Country { get; set; } = string.Empty;

    /// <summary>
    /// Населений пункт або місто доставки.
    /// </summary>
    public string City { get; set; } = string.Empty;

    /// <summary>
    /// Назва вулиці, номер будинку та квартири.
    /// </summary>
    public string Street { get; set; } = string.Empty;

    /// <summary>
    /// Поштовий індекс відділення або району доставки.
    /// </summary>
    public string PostalCode { get; set; } = string.Empty;
}