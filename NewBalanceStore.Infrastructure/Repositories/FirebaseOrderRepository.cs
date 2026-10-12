using System.Diagnostics.CodeAnalysis;
using Firebase.Database;
using Firebase.Database.Query;
using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Domain.Interfaces;
using Newtonsoft.Json.Linq;

namespace NewBalanceStore.Infrastructure.Repositories
{
    /// <summary>
    /// Репозиторій для роботи з колекцією замовлень у хмарній базі даних Firebase Realtime Database.
    /// Зберігає замовлення у вузлі <c>orders</c>.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class FirebaseOrderRepository : IOrderRepository
    {
        private readonly FirebaseClient _firebaseClient;
        private const string CollectionName = "orders";

        /// <summary>
        /// Ініціалізує репозиторій замовлень екземпляром клієнта Firebase.
        /// </summary>
        /// <param name="firebaseClient">Екземпляр клієнта бази даних Firebase.</param>
        public FirebaseOrderRepository(FirebaseClient firebaseClient)
        {
            _firebaseClient = firebaseClient;
        }

        /// <summary>
        /// Створює новий запис замовлення в базі даних.
        /// Якщо числовий ID не вказано, він генерується на основі системного часу UTC.
        /// </summary>
        /// <param name="order">Об'єкт замовлення для збереження.</param>
        public async Task CreateAsync(Order order)
        {
            if (order.Id <= 0)
            {
                // Формування псевдоунікального числового ключа замовлення
                order.Id = (int)(DateTime.UtcNow.Ticks % int.MaxValue);
            }

            await _firebaseClient
                .Child($"{CollectionName}/{order.Id}")
                .PutAsync(order);
        }

        /// <summary>
        /// Отримує одне замовлення з Firebase за числовим ID.
        /// </summary>
        /// <param name="id">Числовий ідентифікатор замовлення.</param>
        /// <returns>Екземпляр <see cref="Order"/> або <c>null</c>.</returns>
        public async Task<Order?> GetByIdAsync(int id)
        {
            var order = await _firebaseClient
                .Child($"{CollectionName}/{id}")
                .OnceSingleAsync<Order>();

            if (order != null)
            {
                order.Id = id;
            }

            return order;
        }

        /// <summary>
        /// Отримує всі наявні замовлення з бази даних для аналітики та обробки менеджерами.
        /// </summary>
        /// <returns>Колекція замовлень <see cref="Order"/>.</returns>
        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            var objects = await _firebaseClient
                .Child(CollectionName)
                .OnceAsync<JObject>();

            var ordersList = new List<Order>();

            foreach (var item in objects)
            {
                try
                {
                    var order = item.Object?.ToObject<Order>();
                    if (order != null)
                    {
                        if (int.TryParse(item.Key, out int parsedId))
                        {
                            order.Id = parsedId;
                        }
                        ordersList.Add(order);
                    }
                }
                catch
                {
                    continue;
                }
            }

            return ordersList;
        }

        /// <summary>
        /// Оновлює статус замовлення за його ID (наприклад, перехід із "Pending" у "Shipped").
        /// </summary>
        /// <param name="id">Ідентифікатор замовлення.</param>
        /// <param name="status">Новий текстовий статус.</param>
        public async Task UpdateStatusAsync(int id, string status)
        {
            var order = await GetByIdAsync(id);
            if (order != null)
            {
                order.Status = status;
                await _firebaseClient
                    .Child($"{CollectionName}/{id}")
                    .PutAsync(order);
            }
        }
    }
}