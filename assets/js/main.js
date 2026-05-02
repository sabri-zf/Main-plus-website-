const barChart_id = document.querySelector("#mychart").getContext('2d');
const doughnut_chart_one_id = document.querySelector('#doughnut-chart').getContext('2d');
const doughnut_chart_two_id = document.querySelector('#doughnut-chart-2').getContext('2d');
const line_chart = document.querySelector("#line-chart").getContext('2d');


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
build_bar_chart(barChart_id);
bulid_doughnut_chart(doughnut_chart_one_id, config_doughnut1);
bulid_line_chart(line_chart);
bulid_doughnut_chart(doughnut_chart_two_id, config_doughnut2);


