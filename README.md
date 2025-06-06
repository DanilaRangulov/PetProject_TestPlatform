# PetProject_TestPlatform

Тестовое задание на позицию Front-End Developer

Платформа для проведения тестирования.  
Технологии: React, TypeScript, Redux Toolkit (RTK).

---

## Ссылки

- Задание: [Google Docs](https://docs.google.com/document/d/1sBXZO9LXpa20HzCEm6oYEkT5vymjdQFpDjOhHUs5u8w/edit?tab=t.0)  
- Figma макет: [Figma](https://www.figma.com/design/N0OmXqflTC6blymmTCPm4Q/AI-test-landing?node-id=1-1762&t=oSz4k4HVySILjCBH-0)

---

## Описание

В проекте реализована сущность **"Тест"**, управляющая всей логикой приложения, через RTK Slice `entities/test`.

### Reducers в слайсе:

- `setImage` — загрузка изображения в состояние  
- `setPreview` — загрузка превью изображения в состояние  
- `nextStep` — переход к следующему шагу теста (изменение `currentStep`)  
- `prevStep` — переход к предыдущему шагу теста  

### AsyncThunk для работы с API:

- `sendImages` — отправка изображений на сервер (POST)  
- `sendAnswers` — отправка ответов пользователя (POST)  
- `getResponse` — получение результатов теста (GET)  

---

## Архитектура UI

Основной компонент — **TestWindow**, который управляет текущим шагом теста и отображает:

- `uploadImageStep` — загрузка изображения (шаг 1)  
- `Questions` — вопросы теста (шаг 2)  
- `Report` — отчет по результатам (шаг 3)  

---

## Компоненты и виджеты(shared и widget слой)

- **AboutKid** — раздел с информацией о ребенке (для Questions)  
- **ErrorWidget** — виджет отображения ошибок  
- **ProgressStep** — индикатор прогресса в процентах  
- **QuestionSection** — секция вопросов для Questions  
- **RadioQuestion** — радио-вопрос (shared-компонент)  
- **SwitchButton** — стилизованная кнопка с темами (NEXT, BACK)  
- **TextQuestion** — текстовый вопрос (shared-компонент)  
- **Tip** — компонент подсказки над вопросами  

