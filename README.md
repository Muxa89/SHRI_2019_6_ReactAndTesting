# Ветка с домашним заданием "React" и "Тестирование"

Проект разрабатывался с использованием NodeJS 10.

## Информация для ДЗ "React"

### Инструкция по запуску

1. Установить зависимости

   ```
   npm install
   ```

1. Запустить бэкэнд (реализован на Express)

   ```
   npm run start:backend <путь до корня репозитория>
   ```

1. Запустить сервер фронта (запустится webpack-dev-server)

   ```
   npm run start:ui
   ```

### Просмотр результатов

Перейти по ссылке http://localhost:8000/.<br>
В таблице отобразятся только те папки, внутри которых находится Git-репозиторий.

### Расположение исходников

|             Директория | Описание                    |
| ---------------------: | :-------------------------- |
| `src/server/server.js` | Исходники бэкэнда           |
|      `src/components/` | Исходники react-компонентов |
|           `src/store/` | Исходники хранилища redux   |

## Информация для ДЗ "Тестирование"

### Интеграционное тестирование

1. Написал плагин для гермионы, который должен автоматически устанавливаться с проектом из моего репозитория.<br>
   Плагин автоматически запускает сервер фронта и бекенд-заглушку.<br>
   На всякий случай прилагаю ссылку на репозиторий с плагином:<br>
   https://github.com/Muxa89/hermione-run-servers<br>
   **Плагин тестировался на Windows. Возможно, что на других системах будут возникать ошибки при окончании тестирования, связанные с неправильным завершением процесса.**
1. Фронт тестируется в паре с сервером-заглушкой.
1. Проверяются следующие сценарии:
   - Для корневой папки:
     - В таблице отображаются имена репозиториев, отправленные сервером
     - Можно перейти в папку репозитория
     - Не показывается ссылка на родительский репозиторий
   - Для папки репозитория:
     - В таблице отображаются имена папок, которые прислал сервер
     - В таблице отображается ссылка на родительский каталог
     - Если находимся в каталоге репозитория первого уровня, нажатие на ссылку на родительский каталог перенаправит браузер в корневую папку
     - Если находимся в каталоге репозитория более глубокого уровня, нажатие на ссылку на родительский каталог перенаправит браузер на один уровень выше
   - Для ссылки на файл:
     - Нажатие на имя файла уберет таблицу с файлами и откроет элемент, содержащий в себе текст файла.
       URL изменится соответствующим образом.

#### Расположение исходников

|                   Директория | Описание                     |
| ---------------------------: | :--------------------------- |
| `test/integration/hermione/` | Исходники тестового сценария |
|    `test/integration/server` | Исходники сервера-заглушки   |

#### Запуск

Интеграционное тестирование запускается командой

```
npm run test:int
```

### Модульное тестирование

1. Для тестирования основным фреймворком выбрал Jest.
1. Для всех методов NodeJS, которые взаимодействуют с ОС, были написаны заглушки, т. о. тестирование не требует наличия файлов на жестком диске.
1. Серверную часть для тестирования разбил на 3 части:
   - api - методы для получения данных с файловой системы
   - app - описание протокола сервера
   - server - начальные проверки и запуск сервера на определенном порте.
1. Логические блоки системы и связанные сценарии:
   - Получение информации из ОС (взаимодействие с GIT)
     - Получение папки .git репозитория
     - Получение списка репозиториев в корневой папке
     - Получение дерева файлов для заданных параметров
     - Получение расширенной информации о файле
     - Получение содержимого файла
   - Предоставление информации по запросу на эндпоинт
     - Обращение на корневой эндпоинт
     - Обращение на эндпоинт репозитория
     - Обращение на эндпоинт репозитория определенной ветки
     - Обращение на эндпоинт определенной ветки в определенный каталог
     - Предоставление содержимого файла

#### Расположение исходников

|         Директория | Описание                 |
| -----------------: | :----------------------- |
| `test/unit/server` | Исходники с юнит-тестами |
|   `test/unit/mock` | Исходники заглушек       |

#### Запуск

Интеграционное тестирование запускается командой

```
npm run test
```
