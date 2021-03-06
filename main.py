import numpy as np
import tensorflow as tf
from flask import Flask, jsonify, render_template, request
from sklearn.externals import joblib

from LinearRegression import my_model
from mnist import model

x = tf.placeholder("float", [None, 784])
x1 = tf.placeholder(tf.float32)
sess = tf.Session()

# restore trained data
with tf.variable_scope("regression"):
    y1, variables = model.regression(x)
saver = tf.train.Saver(variables)
saver.restore(sess, "mnist/data/regression.ckpt")

with tf.variable_scope("convolutional"):
    keep_prob = tf.placeholder("float")
    y2, variables = model.convolutional(x, keep_prob)
saver = tf.train.Saver(variables)
saver.restore(sess, "mnist/data/convolutional.ckpt")

with tf.variable_scope("my_model"):
    y3, variables = my_model.regr(x1)
saver = tf.train.Saver(variables)
saver.restore(sess, "LinearRegression/data/linear_regression.ckpt")

decision_tree = joblib.load('DecisionTree/data/parsing_tree.pkl')
knn = joblib.load('KNN/data/knn.pkl')
svm = joblib.load('SVM/data/svm.pkl')
gaussian = joblib.load('Gaussian/data/gaussian.pkl')


def regression(input):
    return sess.run(y1, feed_dict={x: input}).flatten().tolist()


def convolutional(input):
    return sess.run(y2, feed_dict={x: input, keep_prob: 1.0}).flatten().tolist()


def my_regression(input):
    return sess.run(y3, feed_dict={x1: input})


# webapp
app = Flask(__name__)


def svm_to_array(classify):
    # print("_________", classify)
    category = [0] * 10
    category[np.math.ceil(classify[0])] = 1
    return category


@app.route('/api/mnist', methods=['POST'])
def mnist():
    input = ((255 - np.array(request.json, dtype=np.uint8)) / 255.0).reshape(1, 784)
    output1 = regression(input)
    output2 = convolutional(input)
    output3 = decision_tree.predict(input).flatten().tolist()
    output4 = knn.predict(input).flatten().tolist()
    output5 = svm_to_array(svm.predict(input))
    output6 = svm_to_array(gaussian.predict(input))
    return jsonify(results=[output1, output2, output3, output4, output5, output6])


@app.route('/api/my_regression', methods=['POST'])
def my_reg():
    app.logger.info(request.json)
    input = float(request.json["x"])
    output = my_regression(input)
    return jsonify(results=[float(output)])


@app.route('/image_load')
def train():
    return render_template('image_load.html')


@app.route('/mnist')
def mnist_page():
    return render_template('mnist.html')


@app.route('/my_regression')
def my_regression_page():
    return render_template('my_regression.html')


@app.route('/')
def main():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
