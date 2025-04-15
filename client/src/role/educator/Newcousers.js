import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Newcousers = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState('basic');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        language: '',
        creater: '',
        duration: '',
        subject: '',
        numberOfSlides: 1,
        slides: []
    });

    const handleBasicInfoChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleNumberOfSlidesChange = (e) => {
        const num = parseInt(e.target.value) || 1;
        setFormData({
            ...formData,
            numberOfSlides: num,
            slides: Array(num).fill().map((_, i) => ({
                heading: '',
                content: ''
            }))
        });
    };

    const handleSlideChange = (index, field, value) => {
        const updatedSlides = [...formData.slides];
        updatedSlides[index] = {
            ...updatedSlides[index],
            [field]: value
        };
        setFormData({
            ...formData,
            slides: updatedSlides
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (currentStep === 'basic') {
            if (!formData.title || !formData.description || !formData.creater || !formData.subject) {
                toast.error('Please fill in all required fields');
                return;
            }
            setCurrentStep('slides');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:4000/newcorses', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });

            if (response.status === 200) {
                toast.success('Course created successfully!');
                navigate('/educator/dashboard');
            }
        } catch (error) {
            console.error('Error creating course:', error);
            toast.error(error.response?.data || 'Error creating course');
        }
    };

    const renderBasicInfo = () => (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Create New Course - Basic Information</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title*</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleBasicInfoChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Subject*</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleBasicInfoChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description*</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleBasicInfoChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows="4"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Creator*</label>
                    <input
                        type="text"
                        name="creater"
                        value={formData.creater}
                        onChange={handleBasicInfoChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Language</label>
                    <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={handleBasicInfoChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleBasicInfoChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Slides</label>
                    <input
                        type="number"
                        min="1"
                        name="numberOfSlides"
                        value={formData.numberOfSlides}
                        onChange={handleNumberOfSlidesChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
            </div>
            <div className="mt-6">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Next: Add Slides
                </button>
            </div>
        </div>
    );

    const renderSlides = () => (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Create Course Slides</h2>
            <div className="space-y-6">
                {formData.slides.map((slide, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Slide {index + 1}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Heading</label>
                                <input
                                    type="text"
                                    value={slide.heading}
                                    onChange={(e) => handleSlideChange(index, 'heading', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    value={slide.content}
                                    onChange={(e) => handleSlideChange(index, 'content', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    rows="4"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex space-x-4">
                <button
                    type="button"
                    onClick={() => setCurrentStep('basic')}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Create Course
                </button>
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="min-h-screen bg-gray-100 py-12">
            {currentStep === 'basic' ? renderBasicInfo() : renderSlides()}
        </form>
    );
};

export default Newcousers; 