import React, { useState } from 'react';
import { FaThumbsUp, FaComments, FaPlus } from 'react-icons/fa';
import Avatar from "react-avatar";
import './Topics.css';
import Sidebar from "../Sidebar/Sidebar.jsx";

const Topics = () => {
  const [topics, setTopics] = useState([
    {
      title: "Understanding React Hooks",
      content: "React hooks are a way to use state and lifecycle features in functional components.",
      category: "Technical",
      id: 1,
    },
    {
      title: "JavaScript ES6 Features",
      content: "Learn about the new features introduced in ES6.",
      category: "Technical",
      id: 2,
    },
    {
      title: "The Future of Web Development",
      content: "Exploring trends and technologies shaping the future of web development.",
      category: "Non-Technical",
      id: 3,
    },
    {
      title: "Building Responsive Layouts",
      content: "Techniques to build layouts that work on various screen sizes.",
      category: "Technical",
      id: 4,
    },
    {
      title: "Effective Time Management",
      content: "Strategies for managing your time effectively.",
      category: "Non-Technical",
      id: 5,
    },
  ]);

  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newTopicImage, setNewTopicImage] = useState(null);
  const [newTopicCategory, setNewTopicCategory] = useState(''); 
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({}); 
  const [filter, setFilter] = useState(''); 

  const toggleAddTopic = () => {
    setIsAddTopicOpen(!isAddTopicOpen);
  };

  const handleAddTopic = () => {
    if (newTopicTitle && newTopicContent && newTopicCategory) { 
      const newTopic = {
        title: newTopicTitle,
        content: newTopicContent,
        image: newTopicImage,
        category: newTopicCategory, 
        id: Date.now()
      };
      setTopics([...topics, newTopic]);
      setNewTopicTitle('');
      setNewTopicContent('');
      setNewTopicImage(null);
      setNewTopicCategory(''); 
      setIsAddTopicOpen(false);
      setLikes({ ...likes, [newTopic.id]: 0 });
      setComments({ ...comments, [newTopic.id]: [] });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTopicImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLike = (topicId) => {
    setLikes((prevLikes) => ({ ...prevLikes, [topicId]: (prevLikes[topicId] || 0) + 1 }));
  };

  const handleAddComment = (topicId, commentText) => {
    if (commentText) {
      setComments((prevComments) => ({
        ...prevComments,
        [topicId]: [...(prevComments[topicId] || []), commentText]
      }));
    }
  };

  const handleExpandTopic = (topic) => {
    setExpandedTopic(topic);
  };

  const handleCloseExpandedTopic = () => {
    setExpandedTopic(null);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const filteredTopics = topics.filter(topic => {
    if (!filter) return true;
    return topic.category === filter;
  });

  return (
    <div className="home-container">
      <Sidebar />
      <main className="main-content">
        <div className="user-info">
          <Avatar name="Alice" round={true} size="40" />
          <span className="user-name">Alice / Backend Developer</span>
        </div>

        <h1>Blog Topics</h1>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button onClick={() => handleFilterChange('')}>All</button>
          <button onClick={() => handleFilterChange('Non-Technical')}>Non-Technical</button>
          <button onClick={() => handleFilterChange('Technical')}>Technical</button>
        </div>

        <div className="topics-container">
          {filteredTopics.length === 0 ? (
            <div className="no-posts-message">No Posts Yet</div>
          ) : (
            <div className="topics-grid">
              {filteredTopics.map((topic) => (
                <div key={topic.id} className="topic-card" onClick={() => handleExpandTopic(topic)}>
                  <h2>{topic.title}</h2>
                  <span className={`category-label ${topic.category.toLowerCase()}`}>
                    {topic.category}
                  </span>

                  <div className="actions">
                    <button onClick={(e) => { e.stopPropagation(); handleLike(topic.id); }}>
                      <FaThumbsUp /> {likes[topic.id] || 0} Likes
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleExpandTopic(topic); }}>
                      <FaComments /> {comments[topic.id]?.length || 0} Comments
                    </button>
                  </div>

                  <p>{topic.content}</p>
                  {topic.image && (
                    <img src={topic.image} alt="Topic" className="topic-image" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {expandedTopic && (
          <div className="expanded-topic-modal" onClick={handleCloseExpandedTopic}>
            <div className="expanded-topic-content" onClick={(e) => e.stopPropagation()}>
              <h2>{expandedTopic.title}</h2>
              <span className={`category-label ${expandedTopic.category.toLowerCase()}`}>
                {expandedTopic.category}
              </span>
              <p>{expandedTopic.content}</p>
              {expandedTopic.image && <img src={expandedTopic.image} alt="Expanded Topic" className="expanded-topic-image" />}

              <div className="expanded-comments-section">
                <h4>Comments</h4>
                {comments[expandedTopic.id]?.length > 0 ? (
                  comments[expandedTopic.id].map((comment, idx) => (
                    <p key={idx}><strong>Comment {idx + 1}:</strong> {comment}</p>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddComment(expandedTopic.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
              <button onClick={handleCloseExpandedTopic}>Close</button>
            </div>
          </div>
        )}

        {isAddTopicOpen && (
          <div className="add-topic-modal">
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

              {/* Category selection buttons */}
              <div className="category-buttons">
                <button
                  className={newTopicCategory === 'Technical' ? 'selected' : ''}
                  onClick={() => setNewTopicCategory('Technical')}
                >
                  Technical
                </button>
                <button
                  className={newTopicCategory === 'Non-Technical' ? 'selected' : ''}
                  onClick={() => setNewTopicCategory('Non-Technical')}
                >
                  Non-Technical
                </button>
              </div>
              <button onClick={handleAddTopic}>Add Topic</button>
            </div>
          </div>
        )}

        <button className="floating-button" onClick={toggleAddTopic}>
          <FaPlus />
        </button>
      </main>
    </div>
  );
};

export default Topics;
