// make a function and return all properties, getters and setters in the elonMusk object
function businessUser(businessName, _hoursFree, acceptedPurpose) {
  // the three parameters above are properties of this object that are going to vary with different business users
  return {
    businessName,
    _hoursFree,
    acceptedPurpose,
    pendingMeetings: [], // meetings yet to be approved by Elon Musk
    declinedMeetings: [], // meetings not approved by Elon Musk
    approvedMeetings: [], // meetings approved by Elon Musk
    canceledMeetings: [], // meetings already approved but later canceled maybe something came up
    _feedback: '', // feedback to the booking user (user making the booking)

    get hoursFree() {
      return this._hoursFree;
    },

    get feedBack() {
      this._feedback; // simply return a feedback.
    },

    set newMeeting(meeting) {
      const { name, time, purpose } = meeting;

      if (
        this._hoursFree.indexOf(time) !== -1 &&
        this.acceptedPurpose === 'any'
      ) {
        this.pendingMeetings.push(meeting);

        this._feedback = `${name}, your meeting was sent successfully. ${this.businessName} can now review and approve or decline`;
      } else if (this.acceptedPurpose === purpose.toLowerCase()) {
        this.pendingMeetings.push(meeting);

        this._feedback = `${name}, your meeting was sent successfully. ${this.businessName} can now review and approve or decline`;
      } else {
        this._feedback = `${name}, this meeting is not suitable for ${this.businessName}`;
      }
    },

    set approveMeeting(id) {
      const previewingMeeting = this.pendingMeetings.filter((meeting) => {
        return meeting.id === id;
      })[0];

      // approve previewing meeting and mark the previewingMeeting.time as a booked hour
      this.approvedMeetings.push(previewingMeeting); // note that approvedMeetings is the array while approveMeeting is the setter
      this._hoursFree.splice(
        this._hoursFree.indexOf(previewingMeeting.time),
        1
      );

      this._feedback = `${previewingMeeting.name}, your meeting has been approved, time of meeting: ${previewingMeeting.time}`;
    },

    set declineMeeting(id) {
      const previewingMeeting = this.pendingMeetings.filter((meeting) => {
        return meeting.id === id;
      })[0];

      this.declinedMeetings.push(previewingMeeting); // note that declinedMeetings is the array while declineMeeting is the setter

      this._feedback = `${previewingMeeting.name}, your meeting was declined for reasons best known to ${this.businessName}`;
    },

    set cancelMeeting(id) {
      // the meeting has to be approved first
      const previewingMeeting = this.approvedMeetings.filter((meeting) => {
        return meeting.id === id;
      })[0];

      this._hoursFree.push(previewingMeeting.time); // make the hour of the canceled meeting a free hour
      this.canceledMeetings.push(previewingMeeting); // add canceled meeting to the array of canceled meetings
      this.approvedMeetings.splice(previewingMeeting, 1); // remove canceled meeting from approved meeting array

      this._feedback = `${previewingMeeting.name}, your meeting with ${this.businessName} scheduled at ${previewingMeeting.time} has been canceled by ${this.businessName}. Don't ask me why? am not ${this.businessName}.`;
    },

    set requestHourCancelation(hr) {
      if (this._hoursFree.indexOf(hr) !== -1) {
        this._hoursFree.splice(this._hoursFree.indexOf(hr), 1);
      }
    },
  };
}

const larryPage = businessUser('Larry Page', [15, 12, 9], 'any');
console.log(larryPage.hoursFree);
const willSmith = businessUser('Will Smith', [9, 10], 'fun');
console.log(willSmith.hoursFree);
const billGates = businessUser(
  'Bill Gates',
  [11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
  'any'
); // Mr. Gates is always free.
console.log(billGates.hoursFree);
