import React, { useState } from 'react';
import type { FeedbackModalProps } from '../types';

const FeedbackModal: React.FC<FeedbackModalProps> = ({ 
  isOpen, 
  onClose, 
  language, 
  currentResponse,
  currentUserInput 
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userType, setUserType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://vidyasathi-production.up.railway.app/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          comments: comment,
          user_input: currentUserInput || '',
          assistant_response: currentResponse || '',
        }),
      });

      // Reset form
      setRating(0);
      setComment('');
      setUserType('');
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {language === 'hi' ? 'फीडबैक दें' : 'Give Feedback'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {language === 'hi' ? 'रेटिंग दें:' : 'Rate your experience:'}
              </label>
              <div className="flex space-x-2">
                {stars.map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 transition-colors ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* User Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'hi' ? 'आप कौन हैं?' : 'Who are you?'}
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="input-modern"
                required
              >
                <option value="">
                  {language === 'hi' ? 'चुनें...' : 'Select...'}
                </option>
                <option value="student">
                  {language === 'hi' ? 'छात्र' : 'Student'}
                </option>
                <option value="teacher">
                  {language === 'hi' ? 'शिक्षक' : 'Teacher'}
                </option>
                <option value="parent">
                  {language === 'hi' ? 'अभिभावक' : 'Parent'}
                </option>
                <option value="other">
                  {language === 'hi' ? 'अन्य' : 'Other'}
                </option>
              </select>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'hi' ? 'टिप्पणी (वैकल्पिक):' : 'Comments (optional):'}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="input-modern resize-none"
                placeholder={
                  language === 'hi'
                    ? 'आपका अनुभव कैसा था? सुझाव दें...'
                    : 'How was your experience? Any suggestions...'
                }
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                {language === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={!rating || !userType || isSubmitting}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {language === 'hi' ? 'भेज रहे हैं...' : 'Submitting...'}
                  </div>
                ) : (
                  language === 'hi' ? 'फीडबैक भेजें' : 'Submit Feedback'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
