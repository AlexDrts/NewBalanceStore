using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Domain.Entities;

public class Cart
{
    public string Id { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public List<CartItem> Items { get; set; } = new();
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}