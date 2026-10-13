using NewBalanceStore.Domain.Entities;

namespace NewBalanceStore.Domain.Interfaces
{
    /// <summary>
    /// Контракт репозиторію для збереження та управління замовленнями клієнтів.
    /// </summary>
    public interface IOrderRepository
    {
        /// <summary>
        /// Отримує замовлення за його числовим ідентифікатором.
        /// </summary>
        /// <param name="id">Числовий ідентифікатор замовлення.</param>
        /// <returns>Знайдений об'єкт <see cref="Order"/> або <c>null</c>.</returns>
        Task<Order?> GetByIdAsync(int id);

        /// <summary>
        /// Отримує перелік усіх замовлень у системі (для перегляду адміністрацією).
        /// </summary>
        /// <returns>Колекція замовлень <see cref="Order"/>.</returns>
        Task<IEnumerable<Order>> GetAllAsync();

        /// <summary>
        /// Створює нове замовлення у сховищі даних.
        /// </summary>
        /// <param name="order">Об'єкт замовлення з переліком замовлених товарів.</param>
        Task CreateAsync(Order order);

        /// <summary>
        /// Оновлює поточний статус виконання замовлення за його ID.
        /// </summary>
        /// <param name="id">Ідентифікатор замовлення.</param>
        /// <param name="status">Новий текстовий статус (наприклад, "Processing", "Shipped").</param>
        Task UpdateStatusAsync(int id, string status);
    }
}