clear all;
close all;
clc

csvData = csvread('pattern_exp_data.csv');
disp(csvData);  

reqTime = csvData(:,1);
oeiData = csvData(:,2);
odpData = csvData(:,4);
ofeiData = csvData(:,3);

plot(reqTime,oeiData,'-*',reqTime,odpData,'-o',reqTime,ofeiData,'-v','Linewidth',1); 

set(gca,'fontsize',14,'linewidth',2);
%set(gca,'XTick',[0:1000:200]) %x�b�d��1-6�A���j1
%set(gca,'YTick',[0:6000:1000]) %y�b�d��0-700�A���j100
legend('OEI','ODP','OFEI');   %�k�W���е�
xlabel('Number of data subscription')  %x�b�y�дy�z
ylabel('Response time (ms)') %y�b�y�дy�z