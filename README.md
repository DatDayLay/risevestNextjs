export default function FeedbackForm() {
  const handleSubmit = (e) => {
    e.preventDefault;
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="button">Submit Feedback</button>
    </form>
  );
}
🧠 Your Tasks
Identify and fix the bug.
Explain what the issue was and how you investigated it , this be included in a README.

#Solution:
1. I discovered that the issue with the handleSubmit function is that the e.preventDefault is being called as a property instead of a function hence this won't carry out its intended action
2. The button type is being declared as 'button' instead of 'submit' and that makes it behave just as a generic button instead of a button within a form
