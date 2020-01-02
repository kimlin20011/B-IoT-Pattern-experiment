clear all;
close all;
clc

csvData = csvread('pattern_exp_data.csv');
disp(csvData);  

reqTime = csvData(:,1);
oeiData = csvData(:,2);
odpData = csvData(:,4);
ofeiData = csvData(:,3);

%'nearest'：鄰近點內插法
%'linear'：線性內插法
%'spline'：片段式的三次 Spline 內插法
%'pchip'：保持形狀的片段式三次內插
%'cubic'：和'pchip' 一樣
%'v5cubic'：MATLAB 5 所用的三次內插法

xi = 0:50:1000;  
oei_int = interp1(reqTime, oeiData, xi, 'Pchip');  
odp_int = interp1(reqTime, odpData, xi, 'Pchip');  
ofei_int = interp1(reqTime, ofeiData, xi, 'Pchip');  
oeiPlot = plot(reqTime, oeiData, 'ob', xi, oei_int,':.b','Linewidth',1);
hold on;
odpPlot = plot(reqTime, odpData, '*k', xi, odp_int,':.k','Linewidth',1);  
hold on;
ofeiPlot = plot(reqTime, ofeiData, 'vr', xi, ofei_int,':.r','Linewidth',1);  
%plot(reqTime,oei_int,'-*',reqTime,odp_int,'-o',reqTime,ofei_int,'-v','Linewidth',1);
%plot(xi,oei_int,'-*'); 

set(gca,'fontsize',14,'linewidth',2);
%set(gca,'XTick',[0:1000:200]) %x軸範圍1-6，間隔1
%set(gca,'YTick',[0:6000:1000]) %y軸範圍0-700，間隔100
%legend('OEI','ODP','OFEI');   %右上角標註
grid on;
legend([oeiPlot(1) odpPlot(1) ofeiPlot(1)],'OEI','ODP','OFEI','Location','northwest')
xlabel('Number of data collection')  %x軸座標描述
ylabel('Time(ms)') %y軸座標描述