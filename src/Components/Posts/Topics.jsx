import React, { useState } from 'react';
import { FaThumbsUp, FaComments, FaPlus } from 'react-icons/fa';
import Avatar from "react-avatar";
import './Topics.css';
import Sidebar from "../Sidebar/Sidebar.jsx"; // Import Sidebar component

const Topics = () => {
  const [topics, setTopics] = useState([]); // List of topics
  const [newTopicTitle, setNewTopicTitle] = useState(''); // Title of the new topic
  const [newTopicContent, setNewTopicContent] = useState(''); // Content of the new topic
  const [newTopicImage, setNewTopicImage] = useState(null); // Image of the new topic
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false); // Toggle for Add Topic form
  const [expandedTopic, setExpandedTopic] = useState(null); // To manage expanded post view
  const [comments, setComments] = useState({}); // Manage comments
  const [likes, setLikes] = useState({}); // Manage likes

  // Toggle the form to create a new topic
  const toggleAddTopic = () => {
    setIsAddTopicOpen(!isAddTopicOpen);
  };

  // Add a new topic
  const handleAddTopic = () => {
    if (newTopicTitle && newTopicContent) {
      const newTopic = {
        title: newTopicTitle,
        content: newTopicContent,
        image: newTopicImage, // Add image to the topic
        id: Date.now()
      };
      setTopics([...topics, newTopic]);
      setNewTopicTitle(''); // Clear the input fields
      setNewTopicContent('');
      setNewTopicImage(null); // Clear the image
      setIsAddTopicOpen(false); // Close the form

      // Initialize likes and comments for the new topic
      setLikes({ ...likes, [newTopic.id]: 0 });
      setComments({ ...comments, [newTopic.id]: [] });
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTopicImage(reader.result); // Store the image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle liking a topic
  const handleLike = (topicId) => {
    setLikes((prevLikes) => ({ ...prevLikes, [topicId]: prevLikes[topicId] + 1 }));
  };

  // Handle adding a comment to a topic
  const handleAddComment = (topicId, commentText) => {
    if (commentText) {
      setComments((prevComments) => ({
        ...prevComments,
        [topicId]: [...prevComments[topicId], commentText]
      }));
    }
  };

  // Handle expanding a topic (including viewing and commenting)
  const handleExpandTopic = (topic) => {
    setExpandedTopic(topic); // Set the clicked topic to expanded mode
  };

  // Handle closing the expanded topic modal
  const handleCloseExpandedTopic = () => {
    setExpandedTopic(null); // Close the modal
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        {/* User Info in Top Right */}
        <div className="user-info">
          <Avatar name="Alice" round={true} size="40" />
          <span className="user-name">Alice / Backend Developer</span>
        </div>

        {/* Content Below Navbar */}
        <h1>Blog Topics</h1>

        {/* Topics Container */}
        <div className="topics-container">
          {/* Display "No Posts Yet" if topics array is empty */}
          {topics.length === 0 ? (
            <div className="no-posts-message">
              No Posts Yet
            </div>
          ) : (
            <div className="topics-grid">
              {topics.map((topic) => (
                <div key={topic.id} className="topic-card" onClick={() => handleExpandTopic(topic)}>
                  <h2>{topic.title}</h2>

                  {/* Like and Comment Buttons at the top */}
                  <div className="actions">
                    <button onClick={(e) => { e.stopPropagation(); handleLike(topic.id); }}>
                      <FaThumbsUp /> {likes[topic.id] || 0} Likes
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleExpandTopic(topic); }}>
                      <FaComments /> {comments[topic.id]?.length || 0} Comments
                    </button>
                  </div>

                  {/* Topic content below actions */}
                  <p>{topic.content}</p>

                  {/* Display image if exists */}
                  {topic.image && (
                    <img src={topic.image} alt="Topic" className="topic-image" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expanded Topic Modal */}
        {expandedTopic && (
          <div className="expanded-topic-modal" onClick={handleCloseExpandedTopic}>
            <div className="expanded-topic-content" onClick={(e) => e.stopPropagation()}>
              <h2>{expandedTopic.title}</h2>
              <p>{expandedTopic.content}</p>
              {expandedTopic.image && <img src={expandedTopic.image} alt="Expanded Topic" className="expanded-topic-image" />}

              {/* Display all previous comments */}
              <div className="expanded-comments-section">
                <h4>Comments</h4>
                {comments[expandedTopic.id]?.length > 0 ? (
                  comments[expandedTopic.id].map((comment, idx) => (
                    <p key={idx}><strong>Comment {idx + 1}:</strong> {comment}</p>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}

                {/* Add a new comment */}
                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddComment(expandedTopic.id, e.target.value);
                        e.target.value = ''; // Clear the input
                      }
                    }}
                  />
                </div>
              </div>

              <button onClick={handleCloseExpandedTopic}>Close</button>
            </div>
          </div>
        )}

        {/* Add Topic Form */}
        {isAddTopicOpen && (
          <div className="add-topic-modal"> {/* Centered modal form */}
            <div className="add-topic-form">
              <input
                type="text"
                placeholder="Topic Title"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
              />
              <textarea
                placeholder="Write something about the topic..."
                value={newTopicContent}
                onChange={(e) => setNewTopicContent(e.target.value)}
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <button onClick={handleAddTopic}>Add Topic</button>
            </div>
          </div>
        )}

        {/* Floating Add Topic Button */}
        <button className="floating-button" onClick={toggleAddTopic}>
          <FaPlus />
        </button>
      </main>
    </div>
  );
};

export default Topics;
