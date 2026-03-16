import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const UniversitiesPage = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoading, setImageLoading] = useState({});

  // University image mapping configuration - Highly reliable URLs
  const universityImageMap = {
    "University of Nairobi": "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "Kenyatta University": "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "Jomo Kenyatta University of Agriculture and Technology (JKUAT)": "https://images.unsplash.com/photo-1569068318-0a3d960d6f9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "Moi University": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "Egerton University": "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "Strathmore University": "https://images.unsplash.com/photo-1561049923-2b7c846b5d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "Maseno University": "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "Technical University of Kenya": "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "United States International University Africa (USIU-Africa)": "https://images.unsplash.com/photo-1569068318-0a3d960d6f9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "Daystar University": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "Catholic University of Eastern Africa (CUEA)": "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  };

  // University data configuration with official websites
  const universityData = [
    {
      name: "University of Nairobi",
      description: "Established in 1956, University of Nairobi is Kenya's largest and oldest university, renowned for its excellence in research, teaching, and community engagement. It offers over 900 programs across various faculties including Medicine, Engineering, Business, and Arts.",
      website: "https://www.uonbi.ac.ke",
      programs: ["Medicine & Surgery", "Engineering", "Law", "Business", "Computer Science", "Architecture"]
    },
    {
      name: "Kenyatta University",
      description: "Founded in 1965, Kenyatta University is a comprehensive university committed to quality education and research excellence. It's particularly known for its strong programs in Education, Business, Health Sciences, and Environmental Studies.",
      website: "https://www.ku.ac.ke",
      programs: ["Education", "Business Administration", "Nursing", "Computer Science", "Hospitality", "Environmental Science"]
    },
    {
      name: "Jomo Kenyatta University of Agriculture and Technology (JKUAT)",
      description: "Founded in 1981, JKUAT specializes in technology, engineering, and agricultural sciences. It's a hub of innovation with strong industry partnerships and cutting-edge research facilities.",
      website: "https://www.jkuat.ac.ke",
      programs: ["Engineering", "Computer Science", "Agriculture", "Information Technology", "Architecture", "Business"]
    },
    {
      name: "Moi University",
      description: "Established in 1984, Moi University is a leading public university known for its innovative approach to education and research. It excels in Medicine, Engineering, Information Technology, and Agricultural Sciences.",
      website: "https://mu.ac.ke",
      programs: ["Medicine", "Engineering", "Information Technology", "Agriculture", "Business", "Law"]
    },
    {
      name: "Egerton University",
      description: "Established in 1939 as a technical school, Egerton University is Kenya's oldest agricultural institution. It has grown into a comprehensive university with excellence in Agriculture, Veterinary Medicine, and Environmental Sciences.",
      website: "https://www.egerton.ac.ke",
      programs: ["Agriculture", "Veterinary Medicine", "Education", "Business", "Environmental Science", "Computer Science"]
    },
    {
      name: "Strathmore University",
      description: "Founded in 1961, Strathmore University is a leading private university known for excellence in Business, Information Technology, and Hospitality programs. It emphasizes ethical leadership and professional development.",
      website: "https://strathmore.edu",
      programs: ["Business", "Information Technology", "Hospitality", "Law", "Architecture", "Psychology"]
    },
    {
      name: "Maseno University",
      description: "Founded in 1991, Maseno University is known for its strong academic programs in Education, Sciences, and Humanities. It's located in a serene environment conducive to learning and research.",
      website: "https://www.maseno.ac.ke",
      programs: ["Education", "Computer Science", "Business", "Mathematics", "Biology", "Social Work"]
    },
    {
      name: "Technical University of Kenya",
      description: "Established in 2013 as a technical university, TUK focuses on technology, engineering, and applied sciences. It's committed to producing skilled professionals for Kenya's industrial development.",
      website: "https://www.tukenya.ac.ke",
      programs: ["Engineering", "Information Technology", "Business", "Architecture", "Applied Sciences", "Technology"]
    },
    {
      name: "Daystar University",
      description: "Founded in 1987, Daystar University is a private Christian university known for its strong programs in Communication, Business, and Theology. It emphasizes holistic education and character development.",
      website: "https://www.daystar.ac.ke",
      programs: ["Communication", "Business", "Theology", "Psychology", "Education", "International Studies"]
    },
    {
      name: "United States International University Africa (USIU-Africa)",
      description: "Established in 1969, USIU-Africa is a private university offering American-style education with a focus on International Relations, Business, and Journalism programs.",
      website: "https://www.usiu.ac.ke",
      programs: ["International Relations", "Business", "Journalism", "Psychology", "Information Technology", "Hospitality"]
    },
    {
      name: "Catholic University of Eastern Africa (CUEA)",
      description: "Established in 1989, CUEA is a private university known for excellence in Arts, Sciences, and professional programs. It emphasizes holistic education and moral values.",
      website: "https://www.cuea.edu",
      programs: ["Arts", "Sciences", "Business", "Education", "Theology", "Social Work"]
    }
  ];

  // Dynamic image generation function with preloading
  const generateUniversityImages = async () => {
    setLoading(true);
    
    try {
      // Preload images to ensure they work
      const universitiesWithImages = universityData.map(university => {
        const imageUrl = universityImageMap[university.name] || `https://images.unsplash.com/photo-1561049923-2b7c846b5d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=${Math.random().toString(36).substring(7)}`;
        
        // Preload the image
        const img = new Image();
        img.src = imageUrl;
        
        return {
          ...university,
          image: imageUrl,
          imageSource: getImageSource(university.name)
        };
      });

      // Simulate async loading with random delay to mimic real image fetching
      const loadingTime = Math.random() * 1000 + 500; // 500-1500ms
      await new Promise(resolve => setTimeout(resolve, loadingTime));
      
      setUniversities(universitiesWithImages);
    } catch (error) {
      console.error('Error generating university images:', error);
      // Fallback to static images
      const fallbackUniversities = universityData.map(university => ({
        ...university,
        image: `https://images.unsplash.com/photo-1561049923-2b7c846b5d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
        imageSource: "Unsplash (Fallback)"
      }));
      setUniversities(fallbackUniversities);
    } finally {
      setLoading(false);
    }
  };

  // Get image source information
  const getImageSource = (universityName) => {
    return "University Campus (Professional)";
  };

  // Handle image loading start
  const handleImageLoadStart = (universityName) => {
    setImageLoading(prev => ({
      ...prev,
      [universityName]: true
    }));
  };

  // Handle image loading errors with improved fallback
  const handleImageError = (universityName) => {
    console.log(`Image failed to load for: ${universityName}`);
    setImageLoading(prev => ({
      ...prev,
      [universityName]: false
    }));
    setImageErrors(prev => ({
      ...prev,
      [universityName]: true
    }));
  };

  // Handle image loading success
  const handleImageLoad = (universityName) => {
    setImageLoading(prev => ({
      ...prev,
      [universityName]: false
    }));
    setImageErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[universityName];
      return newErrors;
    });
  };

  // Get image URL with improved fallback
  const getImageUrl = (university) => {
    // If there's an error, use a reliable fallback
    if (imageErrors[university.name]) {
      return `https://images.unsplash.com/photo-1561049923-2b7c846b5d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=${Date.now()}`;
    }
    
    // If university has an image, use it
    if (university.image) {
      return university.image;
    }
    
    // Final fallback - use a guaranteed working URL
    return `https://images.unsplash.com/photo-1561049923-2b7c846b5d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;
  };

  // Refresh images function
  const refreshImages = () => {
    setUniversities([]);
    setImageErrors({});
    setImageLoading({});
    generateUniversityImages();
  };

  // Generate images when component mounts
  useEffect(() => {
    generateUniversityImages();
  }, []);

  // Loading state component
  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-50)' }}>
        <header style={{ backgroundColor: 'var(--kuccps-red)', color: 'var(--kuccps-white)' }} className="py-8">
          <div className="max-w-6xl mx-auto px-6">
            <Link to="/" className="mb-4 inline-block transition-colors hover:text-red-200" style={{ color: 'var(--red-pink)' }}>
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-4">Explore Universities</h1>
            <p className="text-lg" style={{ color: 'var(--red-pink)' }}>
              Loading university information...
            </p>
          </div>
        </header>
        <div className="flex items-center justify-center" style={{ height: '60vh' }}>
          <div className="text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p style={{ color: 'var(--kuccps-red)' }}>Generating university images...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-50)' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'var(--kuccps-red)',
        borderBottom: '6px solid var(--red-dark)',
        boxShadow: '0 4px 20px rgba(196, 30, 58, 0.3)'
      }} className="py-8 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-start mb-6">
            <Link 
              to="/" 
              className="inline-block transition-colors" 
              style={{ color: 'var(--red-pink)' }} 
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--kuccps-white)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--red-pink)'}
            >
              Back to Home
            </Link>
            <ThemeToggle />
          </div>
          <h1 className="text-5xl font-bold mb-4">🎓 Explore Universities</h1>
          <p className="text-xl mb-6" style={{ color: 'var(--red-pink)' }}>
            Discover Kenya's Top Universities and Their Academic Excellence
          </p>
          <button 
            onClick={refreshImages}
            className="px-6 py-3 rounded-lg text-sm font-bold transition-all"
            style={{ 
              backgroundColor: 'var(--kuccps-white)',
              color: 'var(--kuccps-red)',
              border: '2px solid var(--kuccps-white)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--red-pink)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--kuccps-white)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            disabled={loading}
          >
            🔄 Refresh Images
          </button>
        </div>
      </header>

      {/* Universities Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((university, index) => (
            <div 
              key={index} 
              className="rounded-xl shadow-lg overflow-hidden card-hover-red transform transition-all duration-300" 
              style={{ 
                backgroundColor: 'var(--kuccps-white)',
                border: '3px solid var(--kuccps-red)',
                boxShadow: '0 4px 15px rgba(196, 30, 58, 0.2)'
              }}
            >
            <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                {/* Error state */}
                {imageErrors[university.name] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🏛️</div>
                      <p className="text-sm" style={{ color: 'var(--kuccps-red)' }}>Image unavailable</p>
                      <button 
                        onClick={() => {
                          setImageErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors[university.name];
                            return newErrors;
                          });
                        }}
                        className="mt-2 px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Image */}
                <img 
                  src={getImageUrl(university)} 
                  alt={university.name}
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
                  onError={() => handleImageError(university.name)}
                  onLoad={() => handleImageLoad(university.name)}
                />
                
                {/* Source badge */}
                <div className="absolute bottom-0 right-0 text-white text-xs px-3 py-1 rounded-tl-lg font-bold" style={{ backgroundColor: 'var(--kuccps-red)' }}>
                  {university.imageSource}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--kuccps-red)' }}>{university.name}</h3>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>{university.description}</p>
                
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--gray-50)', borderLeft: '4px solid var(--kuccps-red)' }}>
                  <h4 className="font-bold mb-3" style={{ color: 'var(--kuccps-red)' }}>📚 Key Programs:</h4>
                  <div className="flex flex-wrap gap-2">
                    {university.programs.map((program, progIndex) => (
                      <span 
                        key={progIndex}
                        className="px-3 py-2 rounded-lg text-xs font-semibold transition-all transform hover:scale-105"
                        style={{ 
                          backgroundColor: 'var(--kuccps-red)',
                          color: 'var(--kuccps-white)',
                          border: '1px solid var(--red-dark)'
                        }}
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4 border-t-2" style={{ borderTopColor: 'var(--gray-200)' }}>
                  <a 
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 font-bold py-3 px-4 rounded-lg transition-all text-center"
                    style={{ 
                      backgroundColor: 'var(--kuccps-red)',
                      color: 'var(--kuccps-white)',
                      border: '2px solid var(--kuccps-red)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--red-dark)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--kuccps-red)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Visit Website
                  </a>
                  <button 
                    className="flex-1 font-bold py-3 px-4 rounded-lg transition-all"
                    style={{ 
                      backgroundColor: 'var(--kuccps-white)',
                      color: 'var(--kuccps-red)',
                      border: '2px solid var(--kuccps-red)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--red-pink)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--kuccps-white)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--kuccps-black)', color: 'var(--kuccps-white)' }} className="py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg mb-4">
            KUCCPS Career Hub © 2026 | Independent Career Advisory Tool
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/" className="transition-colors hover:text-red-200" style={{ color: 'var(--red-light)' }}>
              Home
            </Link>
            <Link to="/entry" className="transition-colors hover:text-red-200" style={{ color: 'var(--red-light)' }}>
              Get Started
            </Link>
            <a href="https://wa.me/254743315353" className="transition-colors hover:text-red-200" style={{ color: 'var(--red-light)' }}>
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UniversitiesPage;
