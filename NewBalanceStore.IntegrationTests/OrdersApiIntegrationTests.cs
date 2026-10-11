using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.IntegrationTests.Infrastructure;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace NewBalanceStore.IntegrationTests;

[TestFixture]
public class OrdersApiIntegrationTests
{
    private TestApiFactory _factory = null!;
    private HttpClient _client = null!;

    [SetUp]
    public void SetUp()
    {
        _factory = new TestApiFactory();
        _client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });
    }

    [TearDown]
    public void TearDown()
    {
        _client.Dispose();
        _factory.Dispose();
    }

    [Test]
    public async Task CreateOrder_CalculatesItemsPersistsAndReturnsCreatedResource()
    {
        var createDto = new CreateOrderDto
        {
            CustomerName = "Integration Customer",
            CustomerEmail = "integration@example.test",
            CustomerPhone = "555-0100",
            ShippingAddress = "10 Test Street",
            Items =
            [
                new CreateOrderItemDto { ProductId = 1, Color = "Grey", Size = "42", Quantity = 2 },
                new CreateOrderItemDto { ProductId = 3, Color = "White", Size = "M", Quantity = 1 }
            ]
        };

        using var response = await _client.PostAsJsonAsync("/api/orders", createDto);
        var order = await response.Content.ReadFromJsonAsync<OrderDto>();

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Created));
        Assert.That(order, Is.Not.Null);
        Assert.That(order!.TotalAmount, Is.EqualTo(275));
        Assert.That(order.Status, Is.EqualTo("Pending"));
        Assert.That(order.Items, Has.Count.EqualTo(2));
        Assert.That(order.Items[0].ProductName, Is.EqualTo("New Balance 574"));
        Assert.That(order.Items[0].Price, Is.EqualTo(120));
        Assert.That(order.Items[0].Quantity, Is.EqualTo(2));
        Assert.That(response.Headers.Location, Is.Not.Null);

        using var retrieved = await _client.GetAsync($"/api/orders/{order.Id}");
        var persisted = await retrieved.Content.ReadFromJsonAsync<OrderDto>();

        Assert.That(retrieved.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(persisted!.TotalAmount, Is.EqualTo(275));
        Assert.That(persisted.Items, Has.Count.EqualTo(2));
    }

    [Test]
    public async Task GetOrder_WhenMissing_ReturnsNotFound()
    {
        using var response = await _client.GetAsync("/api/orders/99999");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
    }

    [Test]
    public async Task UpdateOrderStatus_PersistsNewStatus()
    {
        using var createResponse = await _client.PostAsJsonAsync("/api/orders", new CreateOrderDto
        {
            CustomerName = "Status Test",
            Items = [new CreateOrderItemDto { ProductId = 1, Size = "42", Quantity = 1 }]
        });
        var created = await createResponse.Content.ReadFromJsonAsync<OrderDto>();

        using var updateResponse = await _client.PatchAsJsonAsync($"/api/orders/{created!.Id}/status", "Shipped");
        using var getResponse = await _client.GetAsync($"/api/orders/{created.Id}");
        var updated = await getResponse.Content.ReadFromJsonAsync<OrderDto>();

        Assert.That(createResponse.StatusCode, Is.EqualTo(HttpStatusCode.Created));
        Assert.That(updateResponse.StatusCode, Is.EqualTo(HttpStatusCode.NoContent));
        Assert.That(getResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(updated!.Status, Is.EqualTo("Shipped"));
    }
}
