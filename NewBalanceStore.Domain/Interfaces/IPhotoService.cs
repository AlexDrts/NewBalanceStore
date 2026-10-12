using System.IO;

namespace NewBalanceStore.Domain.Interfaces;

/// <summary>
/// Контракт сервісу для роботи із завантаженням та обробкою зображень у хмарне сховище (Cloudinary).
/// </summary>
public interface IPhotoService
{
    /// <summary>
    /// Завантажує зображення у хмарний сервіс та повертає публічне захищене посилання (HTTPS URL).
    /// </summary>
    /// <param name="fileStream">Потік байтів файлу зображення.</param>
    /// <param name="fileName">Оригінальна назва файлу зображення.</param>
    /// <returns>Публічний HTTPS URL завантаженого зображення.</returns>
    /// <exception cref="System.Exception">Виникає у разі збою віддаленого завантаження у хмару.</exception>
    Task<string> AddPhotoAsync(Stream fileStream, string fileName);
}