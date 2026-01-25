import { DateValue, parseDate } from "@ark-ui/solid";
import { ValueChangeDetails } from "@zag-js/date-picker";
import { Index, Show, JSX } from "solid-js";
import { Portal } from "solid-js/web";
import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerControl,
  DatePickerInput,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
} from "~/components/ui/date-picker";
import { normalizeDate, parseDateStringToISO8601 } from "~/lib/utils";
import { Label } from "./label";
import { splitProps } from "solid-js";

type ModularDatePickerProps = {
  value: DateValue[] | undefined;
  onValueChange: (value: ValueChangeDetails) => void;
  label?: string | undefined;
  placeholder?: string | undefined;
  onInput?: JSX.EventHandler<
    HTMLInputElement | HTMLTextAreaElement,
    InputEvent
  >;
  onChange?: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, Event>;
  onBlur?: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, FocusEvent>;
};

export const ModularDatePicker = (props: ModularDatePickerProps) => {
  const [inputProps, rootProps] = splitProps(props, [
    "onInput",
    "onChange",
    "onBlur",
    "placeholder",
  ]);
  return (
    <div class="flex flex-col space-y-2">
      <Show when={props.label}>
        <Label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {props.label}
        </Label>
      </Show>
      <DatePicker
        {...rootProps}
        startOfWeek={1}
        format={normalizeDate}
        parse={(value: string): DateValue | undefined => {
          if (!value) return undefined;
          return parseDate(parseDateStringToISO8601(value));
        }}
      >
        <DatePickerControl>
          <DatePickerInput placeholder="Selecione uma data" {...inputProps} />
          <DatePickerTrigger />
        </DatePickerControl>
        <Portal>
          <DatePickerPositioner>
            <DatePickerContent>
              <DatePickerView view="day">
                <DatePickerContext>
                  {(api) => (
                    <>
                      <DatePickerViewControl>
                        <DatePickerPrevTrigger />
                        <DatePickerViewTrigger>
                          <DatePickerRangeText />
                        </DatePickerViewTrigger>
                        <DatePickerNextTrigger />
                      </DatePickerViewControl>
                      <DatePickerTable>
                        <DatePickerTableHead>
                          <DatePickerTableRow>
                            <Index each={api().weekDays}>
                              {(weekDay) => (
                                <DatePickerTableHeader>
                                  {weekDay().short}
                                </DatePickerTableHeader>
                              )}
                            </Index>
                          </DatePickerTableRow>
                        </DatePickerTableHead>
                        <DatePickerTableBody>
                          <Index each={api().weeks}>
                            {(week) => (
                              <DatePickerTableRow>
                                <Index each={week()}>
                                  {(day) => (
                                    <DatePickerTableCell value={day()}>
                                      <DatePickerTableCellTrigger>
                                        {day().day}
                                      </DatePickerTableCellTrigger>
                                    </DatePickerTableCell>
                                  )}
                                </Index>
                              </DatePickerTableRow>
                            )}
                          </Index>
                        </DatePickerTableBody>
                      </DatePickerTable>
                    </>
                  )}
                </DatePickerContext>
              </DatePickerView>
              <DatePickerView view="month">
                <DatePickerContext>
                  {(api) => (
                    <>
                      <DatePickerViewControl>
                        <DatePickerPrevTrigger />
                        <DatePickerViewTrigger>
                          <DatePickerRangeText />
                        </DatePickerViewTrigger>
                        <DatePickerNextTrigger />
                      </DatePickerViewControl>
                      <DatePickerTable>
                        <DatePickerTableBody>
                          <Index
                            each={api().getMonthsGrid({
                              columns: 4,
                              format: "short",
                            })}
                          >
                            {(months) => (
                              <DatePickerTableRow>
                                <Index each={months()}>
                                  {(month) => (
                                    <DatePickerTableCell value={month().value}>
                                      <DatePickerTableCellTrigger>
                                        {month().label}
                                      </DatePickerTableCellTrigger>
                                    </DatePickerTableCell>
                                  )}
                                </Index>
                              </DatePickerTableRow>
                            )}
                          </Index>
                        </DatePickerTableBody>
                      </DatePickerTable>
                    </>
                  )}
                </DatePickerContext>
              </DatePickerView>
              <DatePickerView view="year">
                <DatePickerContext>
                  {(api) => (
                    <>
                      <DatePickerViewControl>
                        <DatePickerPrevTrigger />
                        <DatePickerViewTrigger>
                          <DatePickerRangeText />
                        </DatePickerViewTrigger>
                        <DatePickerNextTrigger />
                      </DatePickerViewControl>
                      <DatePickerTable>
                        <DatePickerTableBody>
                          <Index each={api().getYearsGrid({ columns: 4 })}>
                            {(years) => (
                              <DatePickerTableRow>
                                <Index each={years()}>
                                  {(year) => (
                                    <DatePickerTableCell value={year().value}>
                                      <DatePickerTableCellTrigger>
                                        {year().label}
                                      </DatePickerTableCellTrigger>
                                    </DatePickerTableCell>
                                  )}
                                </Index>
                              </DatePickerTableRow>
                            )}
                          </Index>
                        </DatePickerTableBody>
                      </DatePickerTable>
                    </>
                  )}
                </DatePickerContext>
              </DatePickerView>
            </DatePickerContent>
          </DatePickerPositioner>
        </Portal>
      </DatePicker>
    </div>
  );
};
