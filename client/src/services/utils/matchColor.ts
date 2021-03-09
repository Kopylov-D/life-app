import { Priority } from '../../store/ducks/todos/contracts/state';
import { Colors } from '../../types';

export const matchColor = (priority: Priority | undefined): Colors | undefined => {
  switch (priority) {
    case Priority.high:
      return Colors.red;
    case Priority.middle:
      return Colors.orange;
    case Priority.low:
      return Colors.blue;
  }
};
