import { Notification } from './notification';
import { NotificationErrorProps } from './notification.interface';

describe('unit test for notification', () => {
  it('should create a list of errors', () => {
    const notification = new Notification();

    const error: NotificationErrorProps = {
      message: 'Error message',
      context: 'customer',
    };

    notification.addError(error);

    expect(notification.error_by_context('customer')).toStrictEqual([
      {
        message: 'Error message',
        context: 'customer',
      },
    ]);

    const second_error: NotificationErrorProps = {
      message: 'Error message 2',
      context: 'customer',
    };

    notification.addError(second_error);

    expect(notification.error_by_context('customer')).toStrictEqual([
      {
        message: 'Error message',
        context: 'customer',
      },
      {
        message: 'Error message 2',
        context: 'customer',
      },
    ]);

    const third_error: NotificationErrorProps = {
      message: 'error message 3',
      context: 'order',
    };

    notification.addError(third_error);

    expect(notification.error_by_context().length).toBe(3);
  });
  it('should check if notification has at least one error', () => {
    const notification = new Notification();
    const error = {
      message: 'error message',
      context: 'customer',
    };

    notification.addError(error);
    expect(notification.has_error()).toBe(true);
  });

  it('should get all errors props`', () => {
    const notification = new Notification();

    const error = {
      message: 'error message',
      context: 'customer',
    };

    notification.addError(error);

    expect(notification.get_errors()).toEqual([error]);
  });
});
