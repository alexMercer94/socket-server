export class ChartData {
    private months: string[] = ['enero', 'febrero', 'marzo', 'abril'];
    private values: number[] = [1, 2, 3, 4];

    constructor() {}

    /**
     * Get Chart's data
     */
    getChartData(): { data: number[]; label: string }[] {
        return [{ data: this.values, label: 'Ventas' }];
    }

    /**
     * Increment Month's value in chart
     * @param month Month to increment
     * @param value Value to change
     */
    incrementValue(month: string, value: number): { data: number[]; label: string }[] {
        month = month.toLocaleLowerCase();

        for (let i in this.months) {
            if (this.months[i] === month) {
                this.values[i] += value;
            }
        }

        return this.getChartData();
    }
}
