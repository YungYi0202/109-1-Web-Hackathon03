import Question from '../models/Question'
import Answer from '../models/Answer'

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  Question.find({}, (err, ques) => {
    if (err) {
      console.error(err);
      res.status(403).json({message: 'error', contents: []});
    }
    else{
      //console.log("Question.find");
      //console.log(ques);
      res.status(200).json({message: 'success', contents: ques});
    }

  });
}

exports.CheckAns = async (req, res) => {
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
  Answer.find({}, (err, ans_arr) => {
    if (err) {
      console.error(err);
      res.status(403).json({message: 'error', score: -1});
    }
    else{
      var ret_score=0
      //console.log(req.body);
      //console.log(req.body.params.ans);
      //console.log(ans_arr);

      for(var i=0 ; i < req.body.params.ans.length ; i++){
        //console.log(ans_arr[i].answer);
        if(req.body.params.ans[i]===ans_arr[i].answer){
          ret_score++;
        }
      }
      
      res.status(200).json({message: 'success', score: ret_score});
    }

  });
  //const ans_arr = Answer.find()

}
