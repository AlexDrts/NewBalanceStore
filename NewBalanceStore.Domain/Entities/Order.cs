using System;
using System.Collections.Generic;
using System.Text;

using NewBalanceStore.Domain.Enums;

namespace NewBalanceStore.Domain.Entities;

public class Order
{
    public string Id { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public List<OrderItem> Items { get; set; } = new();
    public CustomerInfo Customer { get; set; } = new();
    public ShippingAddress ShippingAddress { get; set; } = new();
    public decimal TotalPrice { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
