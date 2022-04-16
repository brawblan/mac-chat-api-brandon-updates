import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Channel from '../model/channel';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  //'/v1/channel/add' - Create
  api.post('/add', authenticate, (req, res) => {
    let newChannel = new Channel();
    newChannel.name = req.body.name;
    newChannel.description = req.body.description;

    newChannel.save(err => {
      if(err){
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Channel saved successfully' })
    });
  });

  // '/v1/channel/' - Read
  api.get('/', authenticate, (req, res) => {
    Channel.find({}, (err, channels) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json(channels);
    });
  });

  // '/v1/channel/:id' - Read 1
  api.get('/:id', authenticate, (req, res) => {
    Channel.findById(req.params.id, (err, channel) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json(channel);
    });
  });

    // '/v1/channel/:id' - Update
    api.put('/:id', authenticate, (req, res) => {
      Channel.findById(req.params.id, (err, channel) => {
        if (err) {
          res.status(500).json({ channel: err });
        }

        channel.name = req.body.name;
        channel.description = req.body.description;
  
        channel.save(err => {
          if (err) {
            res.status(500).json({ channel: err });
          }
          res.status(200).json({ channel: 'Channel updated' });
        });
      });
    });

  // '/vq/channel/:id' -Delete
  api.delete('/:id', authenticate, (req, res) => {
    Channel.remove({ _id: req.params.id }, (err, channel) => {
      if (err) {
        res.status(500).json({ channel: err });
      }
      res.status(200).json({ channel: 'Channel Successfully Removed'});
    });
  });

  return api;
}
