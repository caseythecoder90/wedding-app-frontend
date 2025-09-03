import React from 'react';

const AGE_GROUPS = [
  { value: 'ADULT', label: 'Adult' },
  { value: 'CHILD', label: 'Child' },
  { value: 'INFANT', label: 'Infant' }
];

/**
 * Form component for individual family member/plus-one information
 * @param {Object} props
 * @param {Object} props.member - Family member data
 * @param {number} props.index - Index in the family members array
 * @param {Function} props.onUpdate - Callback when member data changes
 * @param {Function} props.onRemove - Callback to remove this member
 * @param {boolean} props.canRemove - Whether this member can be removed
 * @param {boolean} props.isExisting - Whether this is an existing family member
 * @param {boolean} props.isPlusOne - Whether this is a plus-one (changes UI text)
 */
function FamilyMemberForm({ 
  member, 
  index, 
  onUpdate, 
  onRemove, 
  canRemove = true,
  isExisting = false,
  isPlusOne = false
}) {
  const handleChange = (field, value) => {
    onUpdate(index, { [field]: value });
  };

  const handleAttendanceChange = (isAttending) => {
    onUpdate(index, { 
      isAttending,
      // Clear dietary restrictions if not attending
      ...(isAttending ? {} : { dietaryRestrictions: '' })
    });
  };

  const getMemberTitle = () => {
    if (isPlusOne) return 'Plus One';
    
    const fullName = `${member.firstName || ''} ${member.lastName || ''}`.trim();
    
    if (isExisting) {
      // Check if this might be a placeholder name (common patterns)
      const isPlaceholder = !fullName || 
                           fullName.toLowerCase().includes('guest') ||
                           fullName.toLowerCase().includes('member') ||
                           fullName.toLowerCase().includes('placeholder') ||
                           /^(guest|member)\s*\d*$/i.test(fullName);
      
      if (isPlaceholder) {
        return 'Group Member (Please Update Name)';
      }
      return fullName;
    }
    
    return 'Additional Guest';
  };
  
  const memberTitle = getMemberTitle();

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {memberTitle}
        </h4>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            aria-label={`Remove ${memberTitle}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        )}
      </div>

      {/* Attendance Selection */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Will this person attend?
        </h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={`attending-${index}`}
              checked={member.isAttending === true}
              onChange={() => handleAttendanceChange(true)}
              className="text-green-600 focus:ring-green-500 h-4 w-4"
            />
            <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">
              Yes, will attend ✓
            </span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={`attending-${index}`}
              checked={member.isAttending === false}
              onChange={() => handleAttendanceChange(false)}
              className="text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">
              No, will not attend ✗
            </span>
          </label>
        </div>
      </div>

      {/* Only show details if attending */}
      {member.isAttending && (
        <div className="space-y-4">
          {/* Name Fields - Show for all members except true plus-ones */}
          {!isPlusOne && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`firstName-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id={`firstName-${index}`}
                  value={member.firstName || ''}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label htmlFor={`lastName-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id={`lastName-${index}`}
                  value={member.lastName || ''}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
          )}

          {/* Name Fields for Plus-One */}
          {isPlusOne && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`firstName-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Plus One First Name *
                </label>
                <input
                  type="text"
                  id={`firstName-${index}`}
                  value={member.firstName || ''}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label htmlFor={`lastName-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Plus One Last Name *
                </label>
                <input
                  type="text"
                  id={`lastName-${index}`}
                  value={member.lastName || ''}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
          )}

          {/* Age Group */}
          <div>
            <label htmlFor={`ageGroup-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Age Group
            </label>
            <select
              id={`ageGroup-${index}`}
              value={member.ageGroup || 'ADULT'}
              onChange={(e) => handleChange('ageGroup', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white"
            >
              {AGE_GROUPS.map(group => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label htmlFor={`dietary-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Dietary Restrictions or Special Accommodations
            </label>
            <textarea
              id={`dietary-${index}`}
              rows="3"
              value={member.dietaryRestrictions || ''}
              onChange={(e) => handleChange('dietaryRestrictions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white"
              placeholder="Please let us know of any dietary restrictions, allergies, or special accommodations needed..."
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FamilyMemberForm;