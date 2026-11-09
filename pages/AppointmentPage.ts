import { Page, Locator } from '@playwright/test';

export interface AppointmentData {
  facility: string;
  applyReadmission?: boolean;
  program: 'Medicare' | 'Medicaid' | 'None';
  visitDate?: string;
  comment?: string;
}

export class AppointmentPage {
  readonly page: Page;
  readonly appointmentHeading: Locator;
  readonly facilitySelect: Locator;
  readonly readmissionCheckbox: Locator;
  readonly visitDateInput: Locator;
  readonly commentTextarea: Locator;
  readonly bookAppointmentButton: Locator;

  readonly confirmationHeading: Locator;
  readonly summaryFacility: Locator;
  readonly summaryReadmission: Locator;
  readonly summaryProgram: Locator;
  readonly summaryVisitDate: Locator;
  readonly summaryComment: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appointmentHeading = page.locator('h2:has-text("Make Appointment")');
    this.facilitySelect = page.locator('#combo_facility');
    this.readmissionCheckbox = page.locator('#chk_hospotal_readmission');
    this.visitDateInput = page.locator('#txt_visit_date');
    this.commentTextarea = page.locator('#txt_comment');
    this.bookAppointmentButton = page.locator('#btn-book-appointment');

    this.confirmationHeading = page.locator('h2:has-text("Appointment Confirmation")');
    this.summaryFacility = page.locator('#facility');
    this.summaryReadmission = page.locator('#hospital_readmission');
    this.summaryProgram = page.locator('#program');
    this.summaryVisitDate = page.locator('#visit_date');
    this.summaryComment = page.locator('#comment');
  }

  async fillAppointment(data: AppointmentData) {
    await this.facilitySelect.selectOption(data.facility);

    if (data.applyReadmission) {
      await this.readmissionCheckbox.check();
    } else {
      await this.readmissionCheckbox.uncheck();
    }

    await this.page.locator(`input[name="programs"][value="${data.program}"]`).click();

    if (data.visitDate) {
      // Datepicker clears normal fill(), so set the value directly
      await this.visitDateInput.evaluate((el, date) => {
        (el as HTMLInputElement).value = date;
      }, data.visitDate);
    } else {
      await this.visitDateInput.fill('');
    }

    if (data.comment) {
      await this.commentTextarea.fill(data.comment);
    } else {
      await this.commentTextarea.fill('');
    }
  }

  async submitAppointment() {
    await this.bookAppointmentButton.click();
  }

  async getDateValidationMessage(): Promise<string> {
    return await this.visitDateInput.evaluate((el: HTMLInputElement) => el.validationMessage);
  }

  async getSummaryData() {
    return {
      facility: await this.summaryFacility.innerText(),
      readmission: await this.summaryReadmission.innerText(),
      program: await this.summaryProgram.innerText(),
      visitDate: await this.summaryVisitDate.innerText(),
      comment: await this.summaryComment.innerText(),
    };
  }
}
