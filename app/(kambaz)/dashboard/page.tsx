import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">

        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
            <Link href="/courses/5678" className="wd-dashboard-course-link">
                <Image src="/images/javascript.jpg" width={200} height={150} alt="javascript" />
                <div>
                    <h5> CS5678 JavaScript </h5>
                    <p className="wd-dashboard-course-title">
                        Front-End Web Development
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>

        <div className="wd-dashboard-course">
            <Link href="/course/1429" className="wd-dashboard-course-link">
                <Image src="/images/art.jpg" width={200} height={150} alt="arthistory" />
                <div>
                    <h5> ART1429 Art History </h5>
                    <p className="wd-dashboard-course-title">
                        The Beginnings of Art
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>

        <div className="wd-dashboard-course"> 
            <Link href="/course/6823" className="wd-dashboard-course-link">
                <Image src="/images/writing.jpg" width={200} height={150} alt="writing" />
                <div>
                    <h5>
                        ENGW683 Writing
                    </h5>
                    <p className="wd-dashboard-course-title">
                        Interdisiplinary Advanced English Writing
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>

        <div className="wd-dashboard-course"> 
            <Link href="/course/9963" className="wd-dashboard-course-link">
                <Image src="/images/physics.jpg" width={200} height={150} alt="physics" />
                <div>
                    <h5>
                        PHYS9963 Physics
                    </h5>
                    <p className="wd-dashboard-course-title">
                        Physics II
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>

        <div className="wd-dashboard-course"> 
            <Link href="/course/6193" className="wd-dashboard-course-link">
                <Image src="/images/chemistry.jpg" width={200} height={150} alt="chemistry" />
                <div>
                    <h5>
                        CHEM6193 Chemistry
                    </h5>
                    <p className="wd-dashboard-course-title">
                        Understanding the Chemistry Around Us
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>

        <div className="wd-dashboard-course"> 
            <Link href="/course/9366" className="wd-dashboard-course-link">
                <Image src="/images/biology.jpg" width={200} height={150} alt="biology" />
                <div>
                    <h5>
                        BIO9366 Biology
                    </h5>
                    <p className="wd-dashboard-course-title">
                        Understanding the Living
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>

      </div>
    </div>
);}
