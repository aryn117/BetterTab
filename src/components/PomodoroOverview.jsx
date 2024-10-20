import { useState } from 'react';
import { usePomodoroData } from '../contexts/PomodoroDataContext';
import { useModal } from '../contexts/ModalContext';

import { IoCloseOutline } from "react-icons/io5";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// eslint-disable-next-line react/prop-types
function PomodoroOverview() {



    const { sessionsData } = usePomodoroData();
    const { closeModal } = useModal();
    const [activeTab, setActiveTab] = useState('daily');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const chartOptions = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Focus Hours Over the Week'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Hours'
                },
                ticks: {
                    stepSize: 0.2 // Set step size to 0.2
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Days'
                }
            }
        }
    };



    const getDailyOverview = (date) => {
        const dayData = sessionsData.find(day => day.date === date);
        if (!dayData) return { totalWorkTime: 0, totalBreakTime: 0, sessions: [] };

        const totalWorkTime = dayData.sessionsArray.reduce((total, session) => {

            return session.sessionType === 'work' ? total + (new Date(session.endTime) - new Date(session.startTime)) / 1000 : total;
        }, 0);

        const totalBreakTime = dayData.sessionsArray.reduce((total, session) => {
            return session.sessionType === 'break' ? total + (new Date(session.endTime) - new Date(session.startTime)) / 1000 : total;
        }, 0);

        const t = {
            totalWorkTime,
            totalBreakTime,
            sessions: dayData.sessionsArray,
        };

        return t;
    };

    const dailyOverview = getDailyOverview(selectedDate);

    const getTrendsData = () => {
        const sortedData = [...sessionsData].sort((a, b) => new Date(a.date) - new Date(b.date));
        return {
            labels: sortedData.map(day => day.date),
            datasets: [
                {
                    label: 'Total Focus Time (minutes)',
                    data: sortedData.map(day => {
                        const totalWorkTime = day.sessionsArray.reduce((total, session) => {
                            return session.sessionType === 'work' ? total + (new Date(session.endTime) - new Date(session.startTime)) / 60000 : total;
                        }, 0);
                        return Math.round(totalWorkTime);
                    }),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        };
    };

    function formatMilliseconds(ms) {
        if (ms < 0) {
            return "Invalid input: Time cannot be negative.";
        }

        // Calculate total seconds
        const totalSeconds = Math.floor(ms / 1000);

        // Calculate hours, minutes, and seconds
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Format the time string with leading zeros
        const formattedTime = `${String(hours).padStart(2, '0')} H : ${String(minutes).padStart(2, '0')} M : ${String(seconds).padStart(2, '0')} S`;

        return formattedTime;
    }


    return (
        <div className="absolute inset-0 z-20 backdrop-blur-sm bg-black bg-opacity-65 flex justify-center items-center">
            <button className="absolute top-4 right-4 btn-accent  btn mt-4" onClick={closeModal}>
                <IoCloseOutline className='text-2xl' />
            </button>

            <div className="bg-base-300 text-base-content p-6 rounded-md w-3/4 max-h-3/4 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Pomodoro Overview</h2>
                <div className="flex  flex-row items-center justify-between mb-6">
                    <span
                        className={`text-sm text-center w-1/2 cursor-pointer  py-2  rounded-full  ${activeTab === 'daily' ? 'bg-secondary shadow-md text-secondary-content' : ''}`}
                        onClick={() => setActiveTab('daily')}
                    >
                        Daily Overview
                    </span>
                    <span
                        className={`text-sm text-center w-1/2  py-2 cursor-pointer  rounded-full ${activeTab === 'trends' ? 'bg-secondary shadow-md text-secondary-content' : ''}`}
                        onClick={() => setActiveTab('trends')}
                    >
                        Trends
                    </span>
                </div>
                {activeTab === 'daily' && (
                    <div>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="input input-bordered w-full mb-4"
                        />
                        <div className="mb-4 text-2xl font-bold">
                            <p className='text-accent' > Total Focus Time: {dailyOverview.totalWorkTime > 60 ? Math.round(dailyOverview.totalWorkTime / 60) + "minutes" : dailyOverview.totalWorkTime.toFixed(2) + " seconds"} </p>
                            <p className='text-accent' >Total Break Time: {dailyOverview.totalBreakTime > 60 ? Math.round(dailyOverview.totalBreakTime / 60) + "minutes" : dailyOverview.totalBreakTime.toFixed(2) + " seconds"} </p>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-bold w-1/2 border-b-2 border-b-accent">Sessions</h3>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Type</th>
                                        <th>Start Time</th>
                                        <th>Break Time</th>

                                    </tr>
                                </thead>
                                <tbody>


                                    {dailyOverview.sessions.map((session, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{session.sessionType === 'work' ? 'Work' : 'Break'} </td>
                                            <td>
                                                {new Date(session.startTime).toLocaleTimeString()} - {new Date(session.endTime).toLocaleTimeString()}
                                            </td>
                                            <td>
                                                {formatMilliseconds(new Date(session.endTime) - new Date(session.startTime))}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {activeTab === 'trends' && (
                    <div>
                        <Line options={chartOptions} data={getTrendsData()} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default PomodoroOverview;