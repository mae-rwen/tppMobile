import React from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface DatePickerProps {
  value: Date; // The currently selected date
  onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void; // Function to handle date change
  mode?: "date" | "time" | "datetime"; // Mode: "date", "time", or "datetime"
  is24Hour?: boolean; // 24-hour format (default: true)
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  mode,
  is24Hour = true,
}) => {
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={value} // Default value
      mode={mode} // Picker mode (default is "date")
      is24Hour={is24Hour} // 24-hour format
      onChange={onChange} // Handle the date change
    />
  );
};

export default DatePicker;
