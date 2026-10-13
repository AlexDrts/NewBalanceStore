using NUnit.Framework;
using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.Infrastructure.Configurations;

namespace NewBalanceStore.UnitTests;

[TestFixture]
public class DomainAndConfigCoverageTests
{
    [Test]
    public void Domain_Entities_Can_Be_Instantiated()
    {
        var cart = new Cart();
        var cartItem = new CartItem { Quantity = 1 };
        var customerInfo = new CustomerInfo();
        var shippingAddress = new ShippingAddress();
        var order = new Order();
        var orderItem = new OrderItem();
        var product = new Product { Id = 1, Name = "Test" };
        var productVariant = new ProductVariant();
        var user = new User { Email = "test@test.com" };
        var addToCartDto = new AddToCartDto { Quantity = 1 };

        Assert.Multiple(() =>
        {
            Assert.That(cart, Is.Not.Null);
            Assert.That(cartItem.Quantity, Is.EqualTo(1));
            Assert.That(customerInfo, Is.Not.Null);
            Assert.That(shippingAddress, Is.Not.Null);
            Assert.That(order, Is.Not.Null);
            Assert.That(orderItem, Is.Not.Null);
            Assert.That(product.Name, Is.EqualTo("Test"));
            Assert.That(productVariant, Is.Not.Null);
            Assert.That(user.Email, Is.EqualTo("test@test.com"));
            Assert.That(addToCartDto.Quantity, Is.EqualTo(1));
        });
    }

    [Test]
    public void CloudinarySettings_Properties_Work()
    {
        var settings = new CloudinarySettings
        {
            CloudName = "test-cloud",
            ApiKey = "12345",
            ApiSecret = "abcde"
        };

        Assert.Multiple(() =>
        {
            Assert.That(settings.CloudName, Is.EqualTo("test-cloud"));
            Assert.That(settings.ApiKey, Is.EqualTo("12345"));
            Assert.That(settings.ApiSecret, Is.EqualTo("abcde"));
        });
    }
}
