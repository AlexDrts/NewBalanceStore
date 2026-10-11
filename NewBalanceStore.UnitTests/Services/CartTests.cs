using NUnit.Framework;
using NewBalanceStore.Application.DTOs;

using Assert = NUnit.Framework.Assert;

namespace NewBalanceStore.UnitTests.DTOs
{
    [TestFixture]
    public class CartTests
    {
        [Test]
        public void CartDto_TotalAmount_ShouldCalculateCorrectly()
        {
            var cart = new CartDto
            {
                Items = new List<CartItemDto>
                {
                    new CartItemDto { Price = 100, Quantity = 2 },
                    new CartItemDto { Price = 50, Quantity = 1 }
                }
            };

            Assert.That(cart.TotalAmount, Is.EqualTo(250));
        }

        [Test]
        public void CartDto_TotalAmount_ShouldBeZero_WhenCartIsEmpty()
        {
            var cart = new CartDto();

            Assert.That(cart.TotalAmount, Is.Zero);
        }
    }
}