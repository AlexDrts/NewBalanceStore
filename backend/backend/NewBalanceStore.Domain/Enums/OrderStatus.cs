using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Domain.Enums;

public enum OrderStatus
{
    Pending,
    Processing,
    Shipped,
    Delivered,
    Cancelled
}