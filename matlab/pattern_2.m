clear all;
close all;
clc

csvData = csvread('pattern_exp_data.csv');
disp(csvData);  

reqTime = csvData(:,1);
oeiData = csvData(:,2);
odpData = csvData(:,4);
ofeiData = csvData(:,3);

%'nearest'�G�F���I�����k
%'linear'�G�u�ʤ����k
%'spline'�G���q�����T�� Spline �����k
%'pchip'�G�O���Ϊ������q���T������
%'cubic'�G�M'pchip' �@��
%'v5cubic'�GMATLAB 5 �ҥΪ��T�������k

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
%set(gca,'XTick',[0:1000:200]) %x�b�d��1-6�A���j1
%set(gca,'YTick',[0:6000:1000]) %y�b�d��0-700�A���j100
%legend('OEI','ODP','OFEI');   %�k�W���е�
grid on;
legend([oeiPlot(1) odpPlot(1) ofeiPlot(1)],'OEI','ODP','OFEI','Location','northwest')
xlabel('Number of data collection')  %x�b�y�дy�z
ylabel('Time(ms)') %y�b�y�дy�z