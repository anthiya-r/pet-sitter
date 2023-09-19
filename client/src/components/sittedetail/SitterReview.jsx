import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import union from "../../assets/SitterReview/Union.png";
import { StarIcon } from "../systemdesign/Icons";

function SitterReview() {
  const starRates = ["All Reviews", 5, 4, 3, 2, 1];
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [averageRating, setAverageRating] = useState(0.0);
  const [totalReviews, setTotalReviews] = useState(0);
  const params = useParams();

  const [searchData, setSearchData] = useState({ rate: undefined });

  const handleRating = (event, rate) => {
    event.preventDefault();

    if (rate === "All Reviews" || rate !== searchData.rate) {
      setSearchData({
        ...searchData,
        rate,
      });

      const filtered =
        rate === "All Reviews"
          ? reviews
          : reviews.filter((review) => review.rating === rate);

      setFilteredReviews(filtered);
    } else if (rate === searchData.rate) {
      setSearchData({
        ...searchData,
        rate: "All Reviews",
      });

      setFilteredReviews(reviews);
    }
  };

  const getSitterReviewById = async () => {
    try {
      const queryParams = {};

      if (searchData.rate !== "All Reviews") {
        queryParams.rate = searchData.rate;
      }

      const response = await axios.get(`/sitterManagement/${params.sitterId}`, {
        params: queryParams,
      });

      setReviews(response.data.reviews);
      console.log("data", reviews);
      setAverageRating(response.data.reviews[0].avg_rating);
      setTotalReviews(response.data.pagination.totalData);
    } catch (error) {
      console.error("Request error occurred", error);
    }
  };

  useEffect(() => {
    getSitterReviewById();
  }, []);

  useEffect(() => {
    setFilteredReviews(reviews);
  }, [reviews]);

  return (
    <div className="sitter-review w-[100%] min-h-screen bg-etc-bg_gray">
      <div className="sitter-review-container p-6 bg-gray-100 w-[800px] rounded-tl-[120px] rounded-r-[16px] rounded-b-[16px] rounded-l-[16px]">
        <div className="sitter-review-header p-6 bg-etc-white rounded-tl-[99px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[99px] flex items-center gap-8">
          <div className="image-wrapper relative">
            <img src={union} alt="union-icon" />
            <h1 className="average text-headline2 text-etc-white absolute top-[27%] left-[31%]">
              {averageRating ? averageRating : "N/A"}
            </h1>
            <h3 className="total-reviews text-body3 text-etc-white absolute top-[59%] left-[26%]">
              {totalReviews} Reviews
            </h3>
          </div>

          <div className="rating-wrapper flex flex-col gap-4">
            <h1 className="text-headline3 text-etc-black">Rating & Reviews</h1>
            <div className="rating-menu flex gap-2">
              <div>
                <div className="flex flex-wrap gap-2">
                  {starRates.map((rate, index) => (
                    <button
                      type="button"
                      id={`${rate}star`}
                      key={index}
                      className={`flex items-center h-[36px] px-2 py-1 gap-1 border-[1px] rounded-[8px] text-gray-400 border-gray-200 bg-etc-white hover:border-orange-500 ${
                        rate === searchData.rate
                          ? "border-orange-500 text-orange-500"
                          : ""
                      }`}
                      onClick={(e) => handleRating(e, rate)}
                    >
                      <span className="pr-[3px] font-Satoshi">{rate}</span>
                      {Array.from({ length: rate }, (_, index) => (
                        <StarIcon key={index} color="#1CCD83" />
                      ))}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sitter-review-list w-[100%] flex flex-col gap-4 p-6 pt-12 ">
          {filteredReviews && filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
              <div
                className="review flex h-[204px] w-[100%] border border-gray-100 border-b-gray-200 "
                key={index}
              >
                <div className="flex gap-4 w-[30%] items-start">
                  <Avatar
                    alt="avatar"
                    src={review.user_profile_image_path}
                    className="border"
                  />
                  <div>
                    <h2 className="text-body1 text-etc-black ">
                      {review.full_name}
                    </h2>
                    <p className="text-body3 text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="rating flex flex-col w-[65%] gap-5">
                  <div className="star flex gap-1 pt-1">
                    {Array.from({ length: review.rating }, (_, starIndex) => (
                      <StarIcon key={starIndex} color="#1CCD83" />
                    ))}
                  </div>
                  <p className="text-gray-500 text-body2">{review.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div>No reviews available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SitterReview;
