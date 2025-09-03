import React from 'react';
import FamilyMemberForm from './FamilyMemberForm';

/**
 * Section component that manages all group members for different guest types
 * @param {Object} props
 * @param {string} props.guestType - Type of guest (SOLO_WITH_PLUS_ONE, FAMILY_PRIMARY)
 * @param {Array} props.familyMembers - Array of group member data (keeping backend naming)
 * @param {Array} props.existingFamilyMembers - Array of existing group members from backend
 * @param {Object} props.familyGroup - Group information (keeping backend naming)
 * @param {Function} props.onUpdateMember - Callback when member data changes
 * @param {Function} props.onAddMember - Callback to add new member
 * @param {Function} props.onRemoveMember - Callback to remove member
 * @param {boolean} props.attending - Whether primary guest is attending
 */
function GroupMembersSection({
  guestType,
  familyMembers = [],
  existingFamilyMembers = [],
  familyGroup,
  onUpdateMember,
  onAddMember,
  onRemoveMember,
  attending
}) {
  if (!attending) {
    return null; // Don't show group member section if primary guest is not attending
  }

  const canAddMore = () => {
    if (guestType === 'SOLO_WITH_PLUS_ONE') {
      return familyMembers.length === 0; // Can only have one plus-one
    }
    if (guestType === 'FAMILY_PRIMARY' && familyGroup) {
      // Can add up to maxAttendees minus 1 (for primary guest)
      return familyMembers.length < (familyGroup.maxAttendees - 1);
    }
    return false;
  };

  const getSectionTitle = () => {
    switch (guestType) {
      case 'SOLO_WITH_PLUS_ONE':
        return 'Plus One';
      case 'FAMILY_PRIMARY':
        return `Your Group - ${familyGroup?.groupName || 'Additional Guests'}`;
      default:
        return 'Additional Guests';
    }
  };

  const getSectionDescription = () => {
    switch (guestType) {
      case 'SOLO_WITH_PLUS_ONE':
        return 'You can bring one additional guest.';
      case 'FAMILY_PRIMARY':
        const maxGuests = familyGroup?.maxAttendees || 1;
        const currentCount = familyMembers.length + 1; // +1 for primary guest
        return `You can bring up to ${maxGuests - 1} additional guests (${currentCount}/${maxGuests} total).`;
      default:
        return '';
    }
  };

  const getAddButtonText = () => {
    switch (guestType) {
      case 'SOLO_WITH_PLUS_ONE':
        return 'Add Plus One';
      case 'FAMILY_PRIMARY':
        return 'Add Guest';
      default:
        return 'Add Guest';
    }
  };

  return (
    <div className="bg-secondary-light/10 dark:bg-gray-800 p-6 rounded-lg border border-secondary/10 dark:border-gray-700 transition-colors duration-200 space-y-6">
      <div>
        <h3 className="text-lg font-display text-secondary dark:text-secondary-light mb-2 transition-colors duration-200">
          {getSectionTitle()}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {getSectionDescription()}
        </p>
        {guestType === 'FAMILY_PRIMARY' && familyMembers.length > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
            You can edit names, attendance, and details for each member. Remove any you don't need or add new guests up to your limit.
          </p>
        )}
      </div>

      {/* Group Members List */}
      <div className="space-y-4">
        {familyMembers.map((member, index) => {
          const isExisting = existingFamilyMembers.some(existing => existing.id === member.familyMemberId);
          const isPlusOne = guestType === 'SOLO_WITH_PLUS_ONE';
          
          return (
            <FamilyMemberForm
              key={member.familyMemberId ? `existing-${member.familyMemberId}` : `new-${index}`}
              member={member}
              index={index}
              onUpdate={onUpdateMember}
              onRemove={onRemoveMember}
              canRemove={true} // All group members can be removed (including existing ones)
              isExisting={isExisting}
              isPlusOne={isPlusOne}
            />
          );
        })}
      </div>

      {/* Add More Button */}
      {canAddMore() && (
        <button
          type="button"
          onClick={onAddMember}
          className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-secondary/30 dark:border-secondary-light/30 text-secondary dark:text-secondary-light hover:border-secondary dark:hover:border-secondary-light hover:bg-secondary/5 dark:hover:bg-secondary-light/5 rounded-lg transition-all duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          {getAddButtonText()}
        </button>
      )}

      {/* Helper text for limits */}
      {guestType === 'FAMILY_PRIMARY' && familyGroup && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {familyMembers.length >= (familyGroup.maxAttendees - 1) 
            ? 'You have reached the maximum number of guests for your invitation.'
            : `You can add ${(familyGroup.maxAttendees - 1) - familyMembers.length} more guest${(familyGroup.maxAttendees - 1) - familyMembers.length !== 1 ? 's' : ''}.`
          }
        </p>
      )}
    </div>
  );
}

export default GroupMembersSection;