using NewBalanceStore.Application.DTOs;
using NUnit.Framework;

namespace NewBalanceStore.UnitTests.Tests
{
    public class DtoMappingTests
    {
        [Test]
        public void CreateOrderDto_ShouldCorrectlyInitializeProperties()
        {
            var customerName = "Ivan Ivanov";
            var customerEmail = "test@example.com";
            var customerPhone = "+359888888888";
            var address = "Vasil Levski 10, Sofia";

            var dto = new CreateOrderDto
            {
                CustomerName = customerName,
                CustomerEmail = customerEmail,
                CustomerPhone = customerPhone,
                ShippingAddress = address,
                Items = new List<CreateOrderItemDto>
                {
                    new CreateOrderItemDto
                    {
                        ProductId = 101,
                        Color = "Black",
                        Size = "42",
                        Quantity = 2
                    }
                }
            };

            Assert.NotNull(dto);
            Assert.That(dto.CustomerName, Is.EqualTo(customerName));
            Assert.That(dto.CustomerEmail, Is.EqualTo(customerEmail));
            Assert.That(dto.CustomerPhone, Is.EqualTo(customerPhone));
            Assert.That(dto.ShippingAddress, Is.EqualTo(address));
            Assert.That(dto.Items, Has.Count.EqualTo(1));
            Assert.That(dto.Items[0].ProductId, Is.EqualTo(101));
            Assert.That(dto.Items[0].Color, Is.EqualTo("Black"));
            Assert.That(dto.Items[0].Size, Is.EqualTo("42"));
            Assert.That(dto.Items[0].Quantity, Is.EqualTo(2));
        }

        [Test]
        public void CreateOrderDto_DefaultItemsList_ShouldNotBeNull()
        {
            var dto = new CreateOrderDto();

            Assert.NotNull(dto.Items);
            Assert.That(dto.Items, Is.Empty);
        }
    }
}