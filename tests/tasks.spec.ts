import { test } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';
import data from './fixtures/tasks.json';
import { deleteTaskByHelper, postTask } from './support/helpers';
import { TasksPage } from './support/pages/tasks/index';

let tasksPage: TasksPage;

test.beforeEach(async ({ page, request }) => {
  tasksPage = new TasksPage(page);
  await tasksPage.go();
});

test.describe('Registration', () => {
  test('web must be online', async ({ request }) => {
    const task = data.success as TaskModel;

    await tasksPage.create(task);
    await tasksPage.shouldHaveText(task.name);
  });

  test('does not allow duplicate task', async ({ request }) => {
    const task = data.duplicate as TaskModel;
    await deleteTaskByHelper(request, task.name);
    await postTask(request, task);
    await tasksPage.go();
    await tasksPage.create(task);
    await tasksPage.shouldHaveText(task.name);
    await tasksPage.alertHaveText('Task already exists!');
  });

  test('required field', async () => {
    const task = data.required as TaskModel;
    await tasksPage.requiredField();
  });
});

test.describe('Update task', () => {
  test('must update a task', async ({ request }) => {
    const task = data.update as TaskModel;
    await deleteTaskByHelper(request, task.name);
    await tasksPage.create(task);
    await tasksPage.shouldHaveText(task.name);
  });
});

test.describe('Delete task', () => {
  test('must delete a task', async ({ request }) => {
    const task = data.delete as TaskModel;

    await deleteTaskByHelper(request, task.name);
    await postTask(request, task);
    await tasksPage.go();
    await tasksPage.remove(task.name);
    await tasksPage.checkTaskRemoved(task.name);
  });
});
