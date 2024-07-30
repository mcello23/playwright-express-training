import { Page, expect } from '@playwright/test';
import { TaskModel } from '../../../fixtures/task.model';

export class TasksPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async go() {
    await this.page.goto('/');
  }

  async create(task: TaskModel) {
    const inputTaskName = this.page.locator('input[class*=InputNewTask]');
    await inputTaskName.fill(task.name);
    await this.page.click('css=button >> text=Create');
    await this.page.pause();
  }

  async shouldHaveText(taskName: string) {
    const target = this.page.getByText(taskName);
    await expect(target).toBeVisible();
    await this.page.pause();
  }

  async alertHaveText(text: string) {
    const target = this.page.locator('.swal2-html-container');
    await expect(target).toContainText(text);
    await this.page.pause();
  }

  async requiredField() {
    await this.page.click('css=button >> text=Create');
    await this.page.getByText('This is a required field');
    await this.page.pause();
  }

  async toggle(taskName: string) {
    const target = this.page.locator(
      `xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`
    );
    await target.click();
    await this.page.pause();
  }

  async remove(taskName: string) {
    const deleteButton = this.page.locator(
      `xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`
    );
    await deleteButton.click();
    // await this.page.click('button._listItemDeleteButton_1kgm5_52').then(() => {
    //   console.log('clicked');
    // });
    await this.page.pause();
  }

  async shouldBeDone(taskName: string) {
    const target = this.page.getByText(taskName);
    await expect(target).toHaveCSS('text-decoration-line', 'line-through');
    await this.page.pause();
  }

  async toggleAndCheck(taskName: string) {
    const toggleButton = this.page.locator(
      `xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`
    );
    await toggleButton.click();

    const target = this.page.getByText(taskName);
    await expect(target).toHaveCSS('text-decoration-line', 'line-through');
    await this.page.pause();
  }

  async checkTaskRemoved(taskName: string) {
    const target = this.page.getByText(taskName);
    await expect(target).not.toBeVisible();
    await this.page.pause();
  }
}
