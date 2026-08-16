import { build_bar_chart, bulid_doughnut_chart, bulid_line_chart } from './chart_manipulation/dashboard_render.js';

let config_doughnut1 =
{
    data: [12, 10, 4, 10],
    bg_colors: ["#8d4fffa4", "#2564eb7b", "#D97706", "#16A34A"],
}
let config_doughnut2 =
{
    data: [21, 37, 98],
    bg_colors: ["#DC2626", "#D97706", "#16A34A"],
}
// buliding the charts
build_bar_chart("#mychart");
bulid_doughnut_chart('#doughnut-chart', config_doughnut1);
bulid_line_chart("#line-chart");
bulid_doughnut_chart('#doughnut-chart-2', config_doughnut2);


